<template>
  <div id="welcome">
    <div class="jumbotron">
      <h1 class="display-4">Welcome!</h1>
      <p class="lead">This is a boilerplate starter project for the MongoDB-Koa-Node-Vue framework.</p>
      <hr class="my-4">
      <p>The backend API needs to be running as a separate node process. It's expected to be running here: <strong>{{ apiRoot }}</strong></p>
      <div class="links">
        <router-link to="/signup"><button class="btn btn-primary">Sign Up</button></router-link>
        <router-link to="/authenticate"><button class="btn btn-primary">Sign In</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>

import Config from '@/config'
export default {
  data: () => {
    return {
      apiRoot: Config.api.root
    }
  }
}

</script>

<style scoped>

#welcome {
  padding-top: 100px;
}
</style>
