<template>
  <div class="home">
    <div></div>
    <div class ="model-area">

    </div>
    <div class="about-project">
      <h2>About this UQ Digital Twin Visualization Platform</h2>
      <div class = "project">
        The thesis project 'Demonstration of a digital twin of small-scale smart UQ community' aims 
        to <strong>visualize the electricity and other related data information by building 49, building 78 
        and Tesla battery on UQ St Lucia campus</strong>. Furthermore, <strong>it provide feasible tools (graphs & charts)
        for uers and enable them do related data analysis</strong> based on those data. <br>
        (The physical photos of the Tesla battery were omitted, the digital model of the it was built according 
        to other relevant physical drawings and based on imagination)
        <div class = "images">
        <img :src="imgUrl" class="image1"> 
        <img :src="imgUrl1" class = "image2">
        <img :src="imgUrl2" class = "image3">
        <img :src="imgUrl3" class = "image4">
        </div>
        <div class = "describ">
          <div class = "note1">Building 78</div>
          <div class = "note2">Building 78</div>
          <div class = "note3">Building 49</div>
          <div class = "note4">Building 49</div> 
        </div>
        On the <strong>Live Data Panel & Targeted Search interface</strong>, 
        we developed the <strong>real-time data pannel</strong> for users to view the last ten minutes data types of a 
        specific entity. Also, <strong>target search function</strong> could enable users to <strong>search the specific data 
        types in certain time periods in the past.</strong><br> 
        In addition to that, the third interface <strong>Periodically 
        data & Cyclical changes</strong> interface mainly <strong>serves for data analysis and it provides multiple 
        options for users to generate the desired data type in a certain time period. </strong>（Detailed 
        instructions on how to operate these interactive functions are described in detail on the page)
      </div>
    
    </div>
    <div class="about-team">
      <h2>About Our Team</h2>
      <p>
        Our research team consists of a <strong> development team and a teaching team </strong>. The development team consists 
        of five students. <strong>Manu Naganna, Minhao Yu, and Sheershak Kumar are mainly responsible for back-end 
        development and data analysis, while Liqian Zhou and Juancong Tian are mainly responsible for 
        front-end development including modeling. Also, Minhao made contribution to the front-end development.</strong> <br>
        <strong>The teaching team consists of the supervisor Professor Tapan Saha, Kai Li Lim, Wayes Tushar and Sohrab Nizami.</strong>
      </p>
    </div>
  </div>
</template>

<script>
import img from '../assets/image/1.jpg'
import img1 from '../assets/image/2.jpg'
import img2 from '../assets/image/3.jpg'
import img3 from '../assets/image/4.jpg'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: {},
  data() {
    return { imgUrl: img, 
      imgUrl1:img1, 
      imgUrl2:img2, 
      imgUrl3:img3}
  },
  mounted() {},
  beforeUnmount() {},
  computed: {},
  methods: {},
}
</script>
<style scoped lang="scss">
.home {
  min-height: 92vh;
  width: 80vw;
  margin-left: 10vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .about-project,
  .about-team {
    height: 35%;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.6);
    padding: 20px;
    text-align: left;
    font-size: 20px;
    margin-bottom: 2vh;
  }
    .project,
    p {
      line-height: 30px;
    }
  }

  .model-area {
    width: 100%;
    height:90vh;
  }

  .images {
      margin-left: 50px;
      margin-top: 1%;
      margin-bottom: 1%;
    }

  .image1 {
    width: 350px;
    height: 400px;
    opacity: 0.9;
    margin-right: 10px;
  }
  .image2 {
    width: 350px;
    height: 400px;
    opacity: 0.9;
    margin-right: 10px;
  }
  .image3 {
    width: 350px;
    height: 400px;
    opacity: 0.9;
    margin-right: 10px;
  }
  .image4 {
    width: 350px;
    height: 400px;
    opacity: 0.9;
  }
  .describ {
    display: inline-block;
    margin-bottom: 1%;
    width: 100%;
  }

  .note1 {
      float: left;
      margin-left: 10%;
    }

  .note2 {
    float: left;
    margin-left: 18%;
  }

  .note3 {
    float: left;
    margin-left: 18%;
  }

  .note4 {
    float: left;
    margin-left: 18%;
  }
</style>
<style>
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}
</style>
