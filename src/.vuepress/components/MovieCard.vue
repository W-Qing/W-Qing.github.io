<template>
  <div class="content">
    <a class="card" href="#!" v-for="(item, index) in movies" :key="index">
      <div class="front" :style="{ 'background-image': 'url(' + item.imgurl + ')' }">
        <p>{{item.title}}</p>
      </div>
      <div class="back">
        <div>
          <p>{{item.info}}</p>
          <!--<button class="button">Click Here</button> -->
        </div>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  name: 'MovieCard',
  data(){
    return {
      movies: [
        {
          title: '海王',
          info: 'saggdsfgdsfgsfgdg',
          imgurl: 'https://img1.doubanio.com/view/photo/l/public/p2541280047.webp'
        },
        {
          title: '流浪地球',
          info: 'balabalabala',
          imgurl: 'https://img3.doubanio.com/view/photo/l/public/p2546876262.webp'
        },
        {
          title: '飞驰人生',
          info: 'balabalabala',
          imgurl: 'https://img1.doubanio.com/view/photo/l/public/p2547679018.webp'
        },
        {
          title: '疯狂的外星人',
          info: 'balabalabala',
          imgurl: 'https://img3.doubanio.com/view/photo/l/public/p2543725284.webp'
        },
        {
          title: '惊奇队长',
          info: 'balabalabala',
          imgurl: 'https://img3.doubanio.com/view/photo/l/public/p2547205462.webp'
        }
      ]
    }
  },
}
</script>
<style lang="css" scoped>
.content {
  display: flex;
  margin: 0 auto;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1000px;
}
.card {
  color: inherit;
  cursor: pointer;
  width: calc(33% - 2rem);
  min-width: calc(33% - 2rem);
  height: 400px;
  min-height: 400px;
  perspective: 1000px;
  margin: 1rem;
  position: relative;
}
@media screen and (max-width: 800px) {
  .card {
    width: calc(50% - 2rem);
  }
}
@media screen and (max-width: 500px) {
  .card {
    width: 100%;
  }
}

.front,
.back {
  display: flex;
  border-radius: 6px;
  background-position: center;
  background-size: cover;
  text-align: center;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  transition: ease-in-out 600ms;
}

.front {
  background-size: cover;
  padding: 2rem;
  font-size: 1.618rem;
  font-weight: 600;
  color: #fff;
  align-items: flex-end;
  overflow: hidden;
  font-family: Poppins, sans-serif;
}
/*.front:before {
  position: absolute;
  display: block;
  content: '';
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #1a9be6, #1a57e6);
  opacity: .25;
  z-index: -1;
}*/
.card:hover .front {
  transform: rotateY(180deg);
}
.card:nth-child(even):hover .front {
  transform: rotateY(-180deg);
}

.back {
  background: rgba(223, 226, 229, .3);
  transform: rotateY(-180deg);
  padding: 0 2em;
}
.card:hover .back {
  transform: rotateY(0deg);
}
.card:nth-child(even) .back {
  transform: rotateY(180deg);
}
.card:nth-child(even):hover .back {
  transform: rotateY(0deg);
}

.button {
  transform: translateZ(40px);
  cursor: pointer;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  font-weight: bold;
  color: #fff;
  padding: .5em 1em;
  border-radius: 100px;
  font: inherit;
  background: linear-gradient(135deg, #1a9be6, #1a57e6);
  border: none;
  position: relative;
  transform-style: preserve-3d;
  transition: 300ms ease;
}
.button:before {
  transition: 300ms ease;
  position: absolute;
  display: block;
  content: '';
  transform: translateZ(-40px);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  height: calc(100% - 20px);
  width: calc(100% - 20px);
  border-radius: 100px;
  left: 10px;
  top: 16px;
  box-shadow: 0 0 10px 10px rgba(26, 87, 230, 0.25);
  background-color: rgba(26, 87, 230, 0.25);
}
.button:hover {
  transform: translateZ(55px);
}
.button:hover:before {
  transform: translateZ(-55px);
}
.button:active {
  transform: translateZ(20px);
}
.button:active:before {
  transform: translateZ(-20px);
  top: 12px;
}
</style>