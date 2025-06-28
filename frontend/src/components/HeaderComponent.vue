<template>
  <div class="header">
    <div class="container">
      <h3>ระบบฐานข้อมูลกลางสำหรับการเชื่อมต่อและจัดการอุปกรณ์ IoT</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {

    };
  },
  methods: {
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: #343a40;
}

.header {
  height: 70px;
  width: auto;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  box-shadow: 1px 1px 5px #c7c7c7;
}

.container {
  padding-left: 20px;
}
</style>
