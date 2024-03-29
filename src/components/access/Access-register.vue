<template>
  <!--register-tab-->
  <v-tab-item class="access-register-tab-item">
    <v-card>
      <!--register-title-->
      <v-card-title
        primary-title
        class="d-flex flex-column justify-center align-center my-2"
      >
        <div class="logo mb-2">OpenEyz</div>
        <!-- subtitle -->
        <div>Create account</div>
      </v-card-title>
      <v-divider class="mb-7"></v-divider>
      <v-card-text class="pa-0">
        <!--register-form-->
        <v-form ref="register" class="register" v-model="valid" lazy-validation>
          <v-container fluid grid-list-xs>
            <v-row>
              <!--first-name-field-->
              <v-col cols="12" sm="6" class="py-0">
                <v-text-field
                  v-model="lname"
                  required
                  :rules="fieldRules"
                  placeholder="Last name"
                  name="lname"
                  class="pt-0"
                  @keydown="enter"
                ></v-text-field>
              </v-col>
              <!--name-field-->
              <v-col cols="12" sm="6" class="py-0">
                <v-text-field
                  v-model="name"
                  required
                  :rules="fieldRules"
                  placeholder="First name"
                  name="name"
                  class="pt-0"
                  @keydown="enter"
                ></v-text-field>
              </v-col>
              <!--email-field-->
              <v-col cols="12" sm="6" class="py-0">
                <v-text-field
                  v-model="email"
                  required
                  :rules="emailRules"
                  placeholder="E-mail"
                  name="username"
                  class="pt-0"
                  @keydown="enter"
                ></v-text-field>
              </v-col>
              <!--password-field-->
              <v-col cols="12" sm="6" class="py-0">
                <v-text-field
                  v-model="password"
                  required
                  counter
                  :rules="passwordRules"
                  placeholder="Password"
                  name="password"
                  class="pt-0"
                  :type="isSecret ? 'password' : 'text'"
                  @keydown="enter"
                >
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
              <!--description-field-->
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="description"
                  placeholder="Description"
                  name="description"
                  class="pt-0"
                  @keydown="enter"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-divider class="mb-7 mt-8"></v-divider>
          <!--text-terms-->
          <v-card-text class="text-caption text-sm-body-2 py-0">
            By clicking Register, you agree to our Terms and Conditions.
            <br />
            Find out how we collect, use and share your data <br />
            by reading our Data Use Policy and how we use <br />
            cookies and other similar technologies by consulting our Cookies
            Policy. <br />
            You may receive text notifications from us and you can unsubscribe
            at any time. <br />
          </v-card-text>
          <!--register-actions-->
          <v-card-actions>
            <v-container fluid grid-list-xs>
              <v-row>
                <!--check-box-terms-->
                <v-col cols="12" class="py-0">
                  <v-checkbox
                    v-model="checkbox"
                    label="Do you agree?"
                    required
                    :rules="checkBoxRule"
                  >
                  </v-checkbox>
                </v-col>
                <!--register-button-->
                <v-col class="d-flex justify-center my-0 pb-0">
                  <v-btn color="primary" :width="btnSize()" @click="register()"
                    >REGISTER</v-btn
                  >
                </v-col>
              </v-row>
              <!-- link -->
              <v-row>
                <v-col class="d-flex justify-center">
                  <v-btn text color="primary" @click="updateTabAccess(0)"
                    >Got account ?</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-tab-item>
</template>

<script lang="ts">
import Vue from "vue";
import { rules } from "@/utils/rules";
import { mapActions } from "vuex";
import { VueElement, VueFunction } from "../../utils/types";
import { register, enterPressed } from "@/utils/functions";
import { btnSize } from "../../utils/functions";
export default Vue.extend({
  name: "Access-register",
  data() {
    return {
      response: "",
      lname: "",
      name: "",
      email: "",
      password: "",
      description: "",
      valid: false,
      checkbox: false,
      isSecret: true,
      btnSize: btnSize,
      emailRules: [rules.requiredEmail, rules.emailValidator],
      passwordRules: [rules.requiredPasswd, rules.passwdValidator],
      fieldRules: [rules.requiredField, rules.max20, rules.fieldValidator],
      descriptionRules: [rules.requiredField, rules.fieldValidator],
      checkBoxRule: [rules.checked],
    };
  },
  methods: {
    ...mapActions(["updateTabAccess"]),
    /**
     * registers the user
     * @function
     * @async
     */
    async register(): Promise<void> {
      let form: VueElement = this.$refs.register;
      if (form != null) {
        if ((form as unknown as VueFunction).validate()) {
          const formElem: HTMLFormElement | null =
            document.querySelector(".register");
          if (formElem != null) {
            register(new FormData(formElem));
          }
        }
      }
    },
    /**
     * action on enter pressed
     * @function
     * @param event
     */
    enter(event: KeyboardEvent): void {
      enterPressed(event, this.register);
    },
  },
});
</script>
