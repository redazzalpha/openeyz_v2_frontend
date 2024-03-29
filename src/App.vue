<template>
  <v-app id="wrapper" class="app-container" :style="background">
    <LoaderCpn :show="loader" />
    <AlertCpn />
    <div class="app-container-block">
      <AppbarCpn />
      <!--main-->
      <v-main>
        <!--main-section-->
        <section :style="minHeight">
          <!--views-->
          <router-view />
        </section>
      </v-main>
      <DrawerCpn />
      <FooterCpn />
      <ScrollTopBtnCpn />
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import {
  HOME_PAGE_URL,
  INFINITE_SCROLL_OFFSET,
  POST_GET_LIMIT,
} from "./utils/defines";
import { addPosts, closeDialogs, translateDateToISO } from "./utils/functions";
import FooterCpn from "@/components/cpn/Footer-cpn.vue";
import AppbarCpn from "@/components/cpn/Appbar-cpn.vue";
import DrawerCpn from "@/components/cpn/Drawer-cpn.vue";
import ScrollTopBtnCpn from "./components/cpn/ScrollTopBtn-cpn.vue";
import LoaderCpn from "./components/cpn/Loader-cpn.vue";
import AlertCpn from "@/components/cpn/Alert-cpn.vue";
import { mapActions, mapState } from "vuex";
import { socketHandler } from '@/js/socket';

export default Vue.extend({
  name: "App",
  components: {
    AppbarCpn,
    FooterCpn,
    DrawerCpn,
    ScrollTopBtnCpn,
    LoaderCpn,
    AlertCpn,
  },
  computed: {
    ...mapState(["currentUser", "userNotifs", "posts", "loader"]),
    /** selects background style according screen size */
    background(): string {
      const isXs: boolean = this.$vuetify.breakpoint.name == "xs";
      const backgroundAf: string = this.$vuetify.theme.dark
        ? require("./assets/backgrounds/primary-dark.webp")
        : require("./assets/backgrounds/primary.webp");
      const backgroundXs: string = this.$vuetify.theme.dark
        ? require("./assets/backgrounds/primary-xs-dark.webp")
        : require("./assets/backgrounds/primary-xs.webp");
      const backgroundUrl = isXs ? backgroundXs : backgroundAf;
      const backgroundImage: string =
        "background-image:  url(" + backgroundUrl + ");";
      const backgroundRepeat = "background-repeat:  no-repeat;";
      const backgroundPosition = "background-position: center;";
      const backgroundSize = "background-size: cover;";
      const backgroundAttachment = "background-attachment: fixed;";
      const backgroundColor = " background-color: #cccccc;";
      const background: string =
        backgroundImage +
        backgroundRepeat +
        backgroundPosition +
        backgroundSize +
        backgroundColor +
        backgroundAttachment;
      return background;
    },
    /** determines section min height */
    minHeight(): string {
      if (this.$vuetify.breakpoint.name == "xs") return "";
      else return "min-height: 100vh";
    },
  },
  methods: {
    ...mapActions([
      "updateCurrentUser",
      "updateCommentDialog",
      "updateTeamSelectedDialog",
    ]),
    /**
     * downloads publication on scroll to bottom 
     * @function
     */
    infiniteScroll() {
      let scroll: number;
      let bottom: number;
      window.onscroll = async () => {
        scroll = window.scrollY + window.innerHeight;
        bottom = document.body.scrollHeight;
        if (scroll === bottom - INFINITE_SCROLL_OFFSET) {
          if (
            this.posts.length &&
            this.$router.currentRoute.path === HOME_PAGE_URL
          ) {
            const date = translateDateToISO(
              this.posts[this.posts.length - 1].post.creation
            );
            addPosts(POST_GET_LIMIT, date);
          }
        }
      };
    },
    /**
     * set the ckeditor theme, light or dark according user parameter 
     * @function
     */
    ckeThemeSwitcher() {
      if (this.currentUser) this.$vuetify.theme.dark = this.currentUser.dark;
      const style = document.documentElement.style;
      if (this.currentUser && this.currentUser.dark) {
        style.setProperty("--ck-color-base-foreground", "#424242");
        style.setProperty("--ck-color-base-background", "#424242");
        style.setProperty("--ck-color-base-text", "white");
        style.setProperty(
          "--ck-color-button-default-hover-background",
          "#757575"
        );
        style.setProperty("--ck-color-button-on-background", "#757575");
      } else {
        style.removeProperty("--ck-color-base-foreground");
        style.removeProperty("--ck-color-base-background");
        style.removeProperty("--ck-color-base-text");
        style.removeProperty("--ck-color-button-default-hover-background");
        style.removeProperty("--ck-color-button-on-background");
      }
    },
  },
  created() {
    window.onbeforeunload =  ()  => socketHandler.disconnect();
    this.ckeThemeSwitcher();
  },
  updated() {
    closeDialogs();
    this.ckeThemeSwitcher();
  },
  mounted() {
    closeDialogs();
    this.infiniteScroll();
  },
});
</script>

<style lang="scss">
#wrapper {
  scroll-behavior: smooth;
}

.logo {
  font-family: $font-logo;
  font-size: $size-appbar-logo;
}

.btn {
  i {
    color: $color-appbar-icon;
    font-size: $size-appbar-icon;
  }

  span {
    color: $color-appbar-text;
  }
}

.on-hover {
  color: red !important;
}

.app-container {
  transition: background-image 0.7s linear;
}
</style>
