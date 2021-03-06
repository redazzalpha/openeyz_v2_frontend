<template>
  <!-- post-container -->
  <v-container grid-list-xs fluid class="post-cpn-container">
    <v-row>
      <v-col>
        <!--card-container -->
        <v-card
          max-width="500"
          class="mx-auto card mb-6 pb-2"
          elevation="7"
          style="position: relative; border-radius: 7px"
          :color="$vuetify.theme.dark ? '#424242' : ''"
        >
          <!--error-alert-message-->
          <Transition name="scale-transition">
            <v-alert
              v-show="alertMessage"
              dense
              outlined
              type="error"
              style="
                position: absolute;
                top: 40%;
                left: 10%;
                right: 10%;
                z-index: 1;
                word-break: keep-all;
              "
              text
              elevation="5"
              class="mt-3"
              >{{ alertMessage }}</v-alert
            >
          </Transition>
          <!-- header-title -->
          <v-card-title
            v-if="checkCurrentUser()"
            primary-title
            :style="`background-color: ${
              $vuetify.theme.dark ? '#424242' : '#00acc1'
            }`"
            style="border-radius: 7px 7px 0 0"
            class="font-italic white--text mb-4 pa-2"
          >
            <v-btn :ripple="false" plain icon class="pa-7" to="/profile">
              <AvatarCpn
                :avatarSrc="currentUser.avatarSrc"
                :role="currentUser.roles[0].roleName"
              />
            </v-btn>
            Say what you want {{ currentUser.name }}
          </v-card-title>
          <!--editor -->
          <v-card-text>
            <ckeditor
              :editor="editor"
              v-model="editorData"
              height="300"
              tag-name="textarea"
            ></ckeditor>
          </v-card-text>
          <!-- buttons -->
          <v-card-actions class="d-flex justify-center">
            <v-btn
              color="primary"
              :width="btnSize"
              @click="publish"
              :loading="loading"
              :disabled="disabled"
              >Publish</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import ClassicEditor from "@/ckeditor5/ckeditor5";
import { mapGetters, mapState } from "vuex";
import { httpRequest } from "../../utils/http";
import { VueResponse } from "../../utils/types";
import { getAllPosts } from "../../utils/functions";
import AvatarCpn from "../cpn/Avatar-cpn.vue";
import {
  ERROR_MESSAGE_DURATION,
  POST_GET_LIMIT,
  SERVER_PUBLICATION_URL,
} from "../../utils/defines";

export default Vue.extend({
  name: "Post-cpn",
  components: {
    AvatarCpn,
  },
  data() {
    return {
      alertMessage: "",
      editor: ClassicEditor,
      editorData: "",
      loading: false,
      disabled: true,
    };
  },
  computed: {
    ...mapState(["posts", "currentUser"]),
    ...mapGetters(["btnSize"]),
  },
  methods: {
    checkCurrentUser(): boolean {
      return typeof this.currentUser != "function" && this.currentUser != null;
    },
    publish(): void {
      if (this.editorData) {
        this.loading = true;
        this.disabled = true;

        let data: FormData = new FormData();
        this.editorData = this.editorData.trim();
        // TODO: try to add src attribut to see imge on click and try to resize properly the image cause sometimes image is too big
        data.append(
          "post",
          this.editorData.replace(/<img/g, "<img width=100%")
        );
        httpRequest.post(SERVER_PUBLICATION_URL, data).then(
          (): void => {
            this.editorData = "";
            getAllPosts(POST_GET_LIMIT);
          },
          (error: VueResponse): void => {
            this.alertMessage = error.bodyText;
            setTimeout(() => {
              this.alertMessage = "";
            }, ERROR_MESSAGE_DURATION);
          }
        );
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    },
  },
  watch: {
    editorData(value: string) {
      if (value) this.disabled = false;
      else this.disabled = true;
    },
  },
});
</script>

<style lang="scss">
:root {
  --ck-border-radius: 5px;
}
// editor-content
.ck.ck-editor__main > .ck-editor__editable {
  min-height: $height-editor-content;
}
.v-btn__content {
  opacity: 1 !important;
}
</style>

<style lang="scss" scoped>
// AlertCpn icon
.test .v-application .cyan--text.text--darken-1 {
  position: absolute;
}
</style>
