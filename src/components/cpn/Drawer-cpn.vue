<template>
  <v-navigation-drawer
    tag="nav"
    class="drawer-cpn-nav"
    :value="$store.state.drawer"
    @input="update"
    temporary
    app
  >
    <!-- item-list -->
    <v-list-item class="my-2 align-center justify-center">
      <!-- user-avatara -->
      <div>
        <div v-if="checkCurrentUser()">
          <AvatarCpn
            :path="currentUser.avatarSrc ? currentUser.avatarSrc : ''"
            :role="currentUser.roles[0].roleName"
            size="50"
          />
        </div>
      </div>
      <v-list-item-content>
        <v-list-item-title v-if="checkCurrentUser()">{{
          currentUser.name
        }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <!-- links -->
    <v-list dense rounded>
      <!-- item-list -->

      <v-list-item
        v-for="icon in icons"
        :key="icon.title"
        link
        :to="icon.title == 'Logout' ? '' : icon.href"
        @click="icon.title == 'Logout' ? logout() : ''"
      >
        <!-- icon-item -->
        <v-list-item-icon class="cyan--text text--darken-1">
          <i :class="icon.class"></i>
        </v-list-item-icon>

        <!-- content-item -->
        <v-list-item-content>
          <v-hover v-slot="{ hover }">
            <v-list-item-title>
              <v-badge
                :value="
                  icon.title == 'Notifications' && unreadNotif ? true : false
                "
                :dot="!hover"
                overlap
                :content="unreadNotif"
                :color="$vuetify.theme.dark ? 'error' : '#293fa3'"
                style="position: relative; left: 94px; top: -8px"
                class="zombif"
              >
              </v-badge>
              {{ icon.title }}
            </v-list-item-title>
          </v-hover>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import AvatarCpn from "./Avatar-cpn.vue";
import { mapState } from "vuex";
import {
  HOME_PAGE_URL,
  NOTIFICATION_PAGE_URL,
  PROFILE_PAGE_URL,
  TEAM_PAGE_URL,
} from "../../utils/defines";
import { logout, unreadNotif } from "@/utils/functions";
export default Vue.extend({
  name: "Drawer-cpn",
  components: {
    AvatarCpn,
  },
  data() {
    return {
      logout: logout,
      icons: [
        {
          title: "Home",
          class: "fa-solid fa-house",
          href: HOME_PAGE_URL,
        },
        {
          title: "Profile",
          class: "fa-solid fa-user",
          href: PROFILE_PAGE_URL,
        },
        {
          title: "Notifications",
          class: "fa-solid fa-bell",
          href: NOTIFICATION_PAGE_URL,
        },
        {
          title: "Team",
          class: "fa-solid fa-users",
          href: TEAM_PAGE_URL,
        },
        {
          title: "Logout",
          class: "fa-solid fa-right-from-bracket",
          href: "",
        },
      ],
    };
  },
  computed: {
    ...mapState(["currentUser", "userNotifs"]),
    /**
     * returns unread notification number value
     * @function
     * @returns {number}
     */
    unreadNotif() {
      return unreadNotif();
    },
  },
  methods: {
    /**
     * check if current user object is ready to use
     * @function
     * @return {boolean}
     */
    checkCurrentUser(): boolean {
      return typeof this.currentUser != "function" && this.currentUser != null;
    },
    /**
     * updates drawer visibility value
     * @param {boolean} value - visibility value 
     */
    update(value: boolean): void {
      this.$store.dispatch("updateDrawer", value);
    }
  },
});
</script>
