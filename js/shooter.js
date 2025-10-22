
window.onload = function(){
  var canvas = document.querySelector("canvas");
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  var c = canvas.getContext("2d");

  // Game state variables
  let animateId;
  let score, health, _bullets, _enemies, _healthkits, mouse;

  function startGame(){
    // Reset variables
    score = 0;
    health = 100;
    _bullets = [];
    _enemies = [];
    _healthkits = [];

    mouse = {
      x: innerWidth/2,
      y: innerHeight-33
    };

    canvas.addEventListener("mousemove", function(event){
      mouse.x = event.clientX;
    });
    canvas.addEventListener("touchmove", function(event){
      var rect = canvas.getBoundingClientRect();
      var root = document.documentElement;
      var touch = event.changedTouches[0];
      var touchX = parseInt(touch.clientX);
      var touchY = parseInt(touch.clientY) - rect.top - root.scrollTop;
      event.preventDefault();
      mouse.x = touchX;
      mouse.y = touchY;
    });

    const player_width = 32;
    const player_height = 32;
    const playerImg = new Image();
    playerImg.src = "https://image.ibb.co/dfbD1U/heroShip.png";

    const bullet_width = 6;
    const bullet_height = 8;
    const bullet_speed = 10;

    const enemy_width = 32;
    const enemy_height = 32;
    const enemyImg = new Image();
    enemyImg.src = "https://i.ibb.co/0YgHvmx/enemy-fotor-20230927153748.png";

    const healthkit_width = 32;
    const healthkit_height = 32;
    const healthkitImg = new Image();
    healthkitImg.src = "https://image.ibb.co/gFvSEU/first_aid_kit.png";

    function Player(){
      this.draw = function(){
        c.drawImage(playerImg, mouse.x-player_width, mouse.y-player_height);
      };
      this.update = function(){ this.draw(); };
    }

    function Bullet(x, y){
      this.x = x;
      this.y = y;
      this.update = function(){
        this.y -= bullet_speed;
        c.fillStyle = "white";
        c.fillRect(this.x, this.y, bullet_width, bullet_height);
      };
    }

    function Enemy(x, y, speed){
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.update = function(){
        this.y += this.speed;
        c.drawImage(enemyImg, this.x, this.y);
      };
    }

    function Healthkit(x, y, speed){
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.update = function(){
        this.y += this.speed;
        c.drawImage(healthkitImg, this.x, this.y);
      };
    }

    const player = new Player();

    // Spawn enemies
    setInterval(()=>{
      for(let i=0;i<4;i++){
        const x = Math.random()*(innerWidth-enemy_width);
        const speed = Math.random()*2;
        _enemies.push(new Enemy(x, -enemy_height, speed));
      }
    }, 1234);

    // Spawn healthkits
    setInterval(()=>{
      const x = Math.random()*(innerWidth-healthkit_width);
      const speed = Math.random()*2.5;
      _healthkits.push(new Healthkit(x, -healthkit_height, speed));
    }, 15000);

    // Fire bullets automatically
    setInterval(()=>{
      _bullets.push(new Bullet(mouse.x-bullet_width/2, mouse.y-player_height));
    }, 200);

    function collision(a,b){
      return a.x < b.x + enemy_width &&
             a.x + bullet_width > b.x &&
             a.y < b.y + enemy_height &&
             a.y + bullet_height > b.y;
    }

    function updateGameStats(gameName, scoreValue){
      const user = JSON.parse(localStorage.getItem("user"));
      if(!user) return;
      const stats = JSON.parse(localStorage.getItem("gameStats")) || {};
      if(!stats[user.email]) stats[user.email] = {plays:{}, scores:{}};
      stats[user.email].scores[gameName] = Math.max(stats[user.email].scores[gameName] || 0, scoreValue);
      stats[user.email].plays[gameName] = (stats[user.email].plays[gameName] || 0) + 1;
      localStorage.setItem("gameStats", JSON.stringify(stats));
    }

    function animate(){
      animateId = requestAnimationFrame(animate);
      c.clearRect(0,0,innerWidth,innerHeight);
      c.fillStyle = "white";
      c.font = "1em Arial";
      c.fillText("Health: "+health, 5, 20);
      c.fillText("Score: "+score, innerWidth-100, 20);

      player.update();

      // bullets
      for(let i=_bullets.length-1;i>=0;i--){
        _bullets[i].update();
        if(_bullets[i].y<0) _bullets.splice(i,1);
      }

      // enemies
      for(let i=_enemies.length-1;i>=0;i--){
        _enemies[i].update();
        if(_enemies[i].y>innerHeight){
          _enemies.splice(i,1);
          health -= 10;
          if(health <=0){
            cancelAnimationFrame(animateId); // stop game loop
            updateGameStats("Space Shooter", score);
            alert("You DIED!\nYour score was "+score);
            startGame();
            return; // exit animate
          }
        }
      }

      // bullets hit enemies
      for(let i=_enemies.length-1;i>=0;i--){
        for(let j=_bullets.length-1;j>=0;j--){
          if(collision(_enemies[i], _bullets[j])){
            _enemies.splice(i,1);
            _bullets.splice(j,1);
            score++;
            break;
          }
        }
      }

      // healthkits
      for(let i=_healthkits.length-1;i>=0;i--){
        _healthkits[i].update();
        for(let j=_bullets.length-1;j>=0;j--){
          if(collision(_healthkits[i], _bullets[j])){
            _healthkits.splice(i,1);
            _bullets.splice(j,1);
            health += 10;
            break;
          }
        }
      }
    }

    animate();
  }

  startGame();
};
