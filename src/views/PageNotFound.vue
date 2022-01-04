<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">404 - Page Not Found</h1>
            <h4>
				Sorry,<br/>
          		the page you are looking for is currently unavailable,<br/>
          		please try later or contact your system administrator.
            </h4>
            <br />
            <md-button
              class="md-success md-lg"
              v-on:click="moveTo()"
              ><i class="fas fa-home">&nbsp;</i>Back Home</md-button>
          </div>
        </div>
      </div>
    </parallax>
  </div>
</template>

<script>
export default {
  bodyClass: "landing-page",
  props: {
    header: {
      type: String,
      default: require("@/assets/img/broken.jpg")
    },
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  }
};
</script>

