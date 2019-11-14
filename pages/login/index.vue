<template>
  <div class="container">
    <div class="logo_login">
      <img src="~/assets/login/logo_sales_app.svg" />
    </div>
    <div class="form">
      <input
        v-model="idPengguna"
        type="text"
        class="username"
        name
        placeholder="ID pengguna"
      />
      <br />
      <input
        v-model="kataSandi"
        type="password"
        name
        placeholder="Kata sandi"
      />
    </div>
    <UniversalBtn
      :btnValue="UniverBtnValue"
      :btnClick="doLogin"
      class="btnMasuk"
      >Masuk</UniversalBtn
    >
    <br />
    <AlertMsg :messageAlert="MessageValue" />
    <p>Lupa kata sandi?</p>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
}
.logo_login {
  margin-top: 50px;
}
.form {
  margin-top: 50px;
}
.btn_eye {
  background: none;
  border: none;
  outline: none;
}
.buttonInside {
  position: relative;
  margin-bottom: 10px;
}
input {
  font-family: 'Helvetica Neue', Helvetica, sans-serif;
  font-size: 12px;
  outline: none;
}
input[type='text'],
input[type='password'] {
  color: #777;
  padding-left: 10px;
  margin: 10px;
  margin-top: 12px;
  margin-left: 18px;
  width: 290px;
  height: 35px;
}
.btnMasuk {
  background-color: rgb(79, 241, 228);
  border: none;
  color: white;
  padding: 15px 125px;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
}
</style>

<script>
import { mapState, mapMutations } from 'vuex'
import AlertMsg from '~/components/Alert'
import UniversalBtn from '~/components/UniversalButton'
export default {
  components: {
    AlertMsg,
    UniversalBtn
  },
  data() {
    return {
      MessageValue: '',
      UniverBtnValue: 'Masuk',
      idPengguna: '',
      kataSandi: ''
    }
  },
  computed: {
    ...mapState({
      varExpire: (state) => state.login.varExpire
    }),
    ...mapMutations({})
  },
  methods: {
    async doLogin() {
      const authParams = {
        idPengguna: this.idPengguna,
        kataSandi: this.kataSandi
      }
      const getToken = await this.$store.dispatch(
        'user/processLogin',
        authParams
      )
      if (getToken && getToken.hasOwnProperty('access_token')) {
        await this.$store.commit('user/setAccessToken', getToken.access_token)
        await this.$store.commit('user/setRefreshToken', getToken.refresh_token)
        await this.$store.commit('user/setExpireToken', getToken.expires_in)
        const varExpire = {
          path: '/',
          maxAge: getToken.expires_in
        }
        this.$cookies.set(
          'cookie_tokenAccess',
          getToken.access_token,
          varExpire
        )
        this.$cookies.set(
          'cookie_refreshToken',
          getToken.refresh_token,
          varExpire
        )
      } else {
        this.MessageValue = getToken.data.message
      }
      // CALL FUNCTION FOR GET UUID
      const getUUID = await this.$store.dispatch('user/processUUID')
      if (getUUID && getUUID.hasOwnProperty('data')) {
        await this.$store.commit('user/setUUID', getUUID.meta.links.me.meta.id)
        this.$cookies.set(
          'cookie_uuid',
          getUUID.meta.links.me.meta.id,
          this.varExpire
        )
      }
      // CALL FUNCTION FOR GET USER DETAIL (ROLES)
      const getUserDetail = await this.$store.dispatch('user/processUserDetail')
      console.log('User Detail : ', getUserDetail)
    }

    // if (!response && !response.hasOwnProperty('error')) {
    // } else {
    //   this.MessageValue = response.data.message
    // }
  }
}
</script>
