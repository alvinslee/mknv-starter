<template>
  <div id="signin">
    <div class="signin-form">
      <form @submit.prevent="onSubmit">
        <div class="row">
          <div class="col-lg-2 col-md-2 col-sm-3 col-xs-6">
            <label for="email">Email:</label>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
            <input type="email" id="email" v-model="email" class="form-control">
          </div>
        </div>
        <div class="row">
          <div class="col-lg-2 col-md-2 col-sm-3 col-xs-6">
            <label for="password">Password:</label>
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
            <input type="password" id="password" v-model="password" class="form-control">
          </div>
        </div>
        <div class="row">
          <div class="col-lg-2 col-md-2 col-sm-3 col-xs-6">
            &nbsp;
          </div>
          <div class="col-lg-3 col-md-3 col-sm-6 col-xs-6">
            <button type="submit" class="btn btn-success btn-sm">
              Sign In <span class="fas fa-arrow-right"></span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    emailInput () {
      return document.getElementById('email')
    },
    onSubmit () {
      const formData = {
        email: this.email,
        password: this.password
      }
      console.log(formData)
    }
  },
  mounted () {
    this.emailInput().focus()
  }
}

</script>

<style scoped>

#signin {
  padding: 20px;
}

.row div:first-child {
  text-align: right;
  padding-right: 0;
  padding-top: 6px;
}

.row {
  margin-bottom: 12px;
}

</style>
