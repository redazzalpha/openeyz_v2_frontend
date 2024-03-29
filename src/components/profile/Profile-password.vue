<template>
  <v-tab-item class="profile-password-tab-item">
    <!-- main-card -->
    <v-card max-width="600" class="mx-auto mb-10" shaped raised outlined>
      <!-- header-title -->
      <v-card-title class="d-flex flex-column justify-center align-center">
        <!-- tile-avatar -->
        <span style="position: relative">
          <v-avatar size="200">
            <v-img src="../../assets/heads/password.png" alt="alt" />
          </v-avatar>
        </span>
      </v-card-title>
      <!-- password-tab-content -->
      <v-card-text>
        <v-container grid-list-xs>
          <!-- title-row -->
          <v-row>
            <v-col>
              <h3 class="text-decoration-underline">Password</h3>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <h4 class="text-subtitle-1">Modify my password</h4>
              <p>
                Password modification requires the current one.<br />
                Please insert your actual password and set the new one
                through<br />
                the new password field.
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <!-- modify-password-card -->
              <v-card elevation="0">
                <v-card-text class="pa-0">
                  <!-- modify-password-form -->
                  <v-form class="form" ref="form" v-model="valid">
                    <v-container grid-list-xs>
                      <!-- current-password-field-row -->
                      <v-row>
                        <v-col class="pa-0">
                          <v-text-field
                            placeholder="Current password"
                            counter
                            :type="isSecret ? 'password' : 'text'"
                            name="currentPassword"
                            :rules="passwordRules"
                          >
                            <!-- current-password-field-eye-icon -->
                            <template v-slot:append>
                              <v-btn
                                icon
                                plain
                                :ripple="false"
                                @click="isSecret = !isSecret"
                                ><v-icon>{{
                                  isSecret ? "mdi-eye-off" : "mdi-eye"
                                }}</v-icon></v-btn
                              >
                            </template>
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <!-- new-password-field-row -->
                      <v-row>
                        <v-col class="pa-0">
                          <v-text-field
                            placeholder="New password"
                            counter
                            :rules="passwordRules"
                            :type="isSecret ? 'password' : 'text'"
                            name="newPassword"
                          >
                            <!-- new-password-field-eye-icon -->
                            <template v-slot:append>
                              <v-btn
                                icon
                                plain
                                :ripple="false"
                                @click="isSecret = !isSecret"
                                ><v-icon>{{
                                  isSecret ? "mdi-eye-off" : "mdi-eye"
                                }}</v-icon></v-btn
                              >
                            </template>
                          </v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="d-flex justify-center">
                          <v-btn
                            :width="btnSize()"
                            color="primary"
                            @click="sendPassword"
                            :disabled="!valid"
                            :loading="loading"
                            >Modify
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-tab-item>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import { VueElement, VueFunction } from "../../utils/types";
import { rules } from "@/utils/rules";
import { ERROR_MESSAGE_DURATION } from "../../utils/defines";
import { modifyUserPassword } from "@/utils/functions";
import { btnSize } from "../../utils/functions";

export default Vue.extend({
  name: "Profile-password",
  components: {
  },
  data() {
    return {
      isSecret: true,
      passwordRules: [rules.requiredPasswd, rules.passwdValidator],
      loading: false,
      valid: false,
      currentPasswd: "",
      newPasswd: "",
      btnSize: btnSize,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    ...mapActions(["updateCurrentUser"]),

    /**
     * modifies user password
     * @function
     * @returns {Promise<void>}
     */
    async sendPassword(): Promise<void> {
      this.loading = true;
      this.valid = false;

      let form: VueElement = this.$refs.form;
      if (form != null) {
        if ((form as unknown as VueFunction).validate()) {
          const formElem: HTMLFormElement | null =
            document.querySelector(".form");
          if (formElem != null) {
            modifyUserPassword(new FormData(formElem)).then(() =>
              (form as unknown as VueFunction).reset()
            );
            setTimeout(() => {
              this.loading = false;
            }, ERROR_MESSAGE_DURATION);
            this.valid = true;
          }
        }
      }
    },
  },
});
</script>
