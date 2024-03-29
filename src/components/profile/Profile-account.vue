<template>
  <v-tab-item class="profile-account-tab-item">
    <!-- main-card -->
    <v-card max-width="600" class="mx-auto mb-10" shaped raised outlined>
      <!-- header-title -->
      <v-card-title class="d-flex flex-column justify-center align-center">
        <!-- title-avatar -->
        <span style="position: relative">
          <v-avatar size="175" tile>
            <v-img src="../../assets/heads/account.png" alt="alt" />
          </v-avatar>
        </span>
      </v-card-title>
      <!-- account-tab-content -->
      <v-card-text>
        <v-container grid-list-xs>
          <!-- title-row -->
          <v-row>
            <v-col>
              <h3 class="text-decoration-underline">Account</h3>
            </v-col>
          </v-row>
          <v-row>
            <!-- delete-account-card -->
            <v-col class="pt-0 px-0">
              <v-form>
                <!-- delete-account-container -->
                <v-container grid-list-xs>
                  <!-- introduction-row -->
                  <v-row>
                    <v-col>
                      <h4 class="text-subtitle-1">Delete my account</h4>
                      <p>
                        This section is about deleting your account. <br />
                        We are interested to know why you want to delete your
                        account.
                        <br />
                        Please leave us feedback in order to continue to improve
                        the application <br />
                        and maybe see you come back with us. <br />
                        Thank you.
                      </p>
                    </v-col>
                  </v-row>
                  <!-- area-row -->
                  <v-row>
                    <v-col>
                      <v-textarea
                        outlined
                        no-resize
                        autoGrow
                        v-model="areaModel"
                        placeholder="Let us know why?..."
                        rows="1"
                        append="mdi-send"
                      >
                      </v-textarea>
                    </v-col>
                  </v-row>
                  <!-- button-row -->
                  <v-row>
                    <v-col class="d-flex justify-center">
                      <v-btn
                        :width="btnSize()"
                        color="#ba1c1e"
                        class="white--text"
                        @click.stop="dialog = !dialog"
                      >
                        Delete my account</v-btn
                      >
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
    <!-- delete-dialog -->
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <!-- dialog-title -->
        <v-card-title
          class="text-h5 white--text"
          style="background-color: #ba1c1e"
        >
          Delete My account
        </v-card-title>
        <!-- dialog-content -->
        <v-card-text>
          <!-- information-text -->
          <p>
            <span class="d-block text-h6 font-weight-bold">Warning</span>
            Your are about to delete your account. <br />
            Be aware that all informations like post(s), comment(s)... <br />
            will be deleted from database. <br />
            If you procced this operation cannot be undone.
          </p>

          <!-- confirm-action -->
          <div class="mt-5">
            Please insert
            <span class="font-weight-bold">{{ current("username") }}</span> to
            confirm.
          </div>
          <!-- confirm-field -->
          <v-text-field
            v-model="confirmModel"
            solo
            hide-details
            style="border: solid red 2px"
          >
          </v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <!-- button-action -->
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            @click="delAccount"
            :disabled="!(confirmModel === current('username'))"
          >
            Procced
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-tab-item>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import { mapActions } from "vuex";
import {
  deleteUserAccount,
  btnSize,
  getCurrentRole,
  getCurrent,
} from "../../utils/functions";
export default Vue.extend({
  name: "Profile-account",
  components: {
  },
  data() {
    return {
      areaModel: "",
      confirmModel: "",
      dialog: false,
      confirm: false,
      btnSize: btnSize,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    ...mapActions(["updateCurrentUser"]),
    /**
     * shorthand to get current data
     * @function
     * @param {string} value - type of param to get 
     * @returns {string}
     */
    current(value: string): string {
      return getCurrent(value);
    },
    /**
     * shorthand to get current user role 
     * @function
     * @returns {string}
     */
    currentRole(): string {
      return getCurrentRole();
    },
    /**
     * deletes user account
     * @function
     */
    delAccount() {
      deleteUserAccount();
    },
  },
});
</script>
