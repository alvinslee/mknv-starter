<template>
  <header id="header">
    <div id="home">
      <router-link to="/">
        <span class="fas fa-home"></span>
      </router-link>
    </div>
    <nav>
      <ul>
        <li>
          <router-link to="/signup">Create New Account</router-link>
        </li>
        <li>
          <router-link to="/authenticate">Sign In</router-link>
        </li>
        <li>
          <router-link to="/dashboard">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/signout">Sign Out</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>

export default {}

</script>

<style scoped>
  #header {
    height: 60px;
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background-color: #521751;
  }

  #home a {
    text-decoration: none;
    color: white;
    font-size: 120%;
  }

  nav {
    height: 100%;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
    display: flex;
    flex-flow: row;
    align-items: center;
  }

  li {
    margin: 0 16px;
  }

  li a {
    text-decoration: none;
    color: white;
  }

  li a:hover,
  li a:active,
  li a.router-link-active {
    color: #fa923f;
  }
</style>
