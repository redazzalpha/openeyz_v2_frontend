<template>
  <div v-if="show" class="link-cpn-container d-flex flex-column flex-sm-row align-center">
    <v-hover 
    v-for="icon in icons"
    :key="icon.title" 
    v-slot="{hover}"
    >
      <v-badge 
      :value="icon.title == 'Notifications' && unreadNotif? true : false"
      :dot="!hover"
      overlap
      :content="unreadNotif"
      :color="$vuetify.theme.dark ? 'error' : '#293fa3'"
      >
        <v-btn
          class="btn d-flex mx-2"
          elevation="0"
          color="transparent"
          :title="icon.title"
          :to="icon.title == 'Logout' ? '' : icon.href"
          @click="icon.title == 'Logout' ? logout() : ''"
          :ripple="plain"
          :plain="!plain"
        >
          <i :class="icon.class + ' mr-1'"></i>
          <span style="font-size: 13px">{{ icon.title }}</span>
        </v-btn>
      </v-badge>
    </v-hover>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { httpRequest } from "@/utils/http";
import { mapState } from 'vuex';
import { Notif } from "../../utils/types";
import { HOME_PAGE_URL, NOTIFICATION_PAGE_URL, PROFILE_PAGE_URL, SERVER_LOGOUT_URL, TEAM_PAGE_URL } from "../../utils/defines";
export default Vue.extend({
  name: "Links-cpn",
  props: {
    show: {
      type: Boolean,
      required: false,
      default: false,
    },
    plain: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
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
    ...mapState([
      'userNotifs'
    ]),
    unreadNotif() {
        return this.userNotifs.filter((e: Notif) => {
          return !e.read
        }).length;
    }
  },
  methods: {
    logout(): void {
      httpRequest.post(SERVER_LOGOUT_URL);
    },
  },
});
</script>

<style lang="scss" scoped>
