<template>
    <v-footer :color="$vuetify.theme.dark? '' : '#757575'" class="footer-cpn-footer ck pt-5">
        <!--main-conatiner-->
        <v-container fluid grid-list-xs>
            <!--follow-us-row-->
            <v-row>
                <v-col class="text-center white--text">
                    <span>Folow us:</span>
                </v-col>
            </v-row>
            <!--follow-us-row-->
            <v-row class="d-flex justify-center">
                <v-col class="mb-5  shrink" v-for="icon in icons" :key="icon">
                    <v-btn class="white--text" icon>
                        <v-icon size="30px">{{ icon }}</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row class="d-flex justify-center">
                <v-col class="mb-5  shrink">
                    <LinksCpn show  :plain="false" />
                </v-col>
            </v-row>
            <!--copyright-row-->
            <v-row>
                <v-col class="py-4 text-center white--text" cols="12" style="background-color: rgba(0, 0, 0, 0.2);">
                    © {{ new Date().getFullYear() }} Copyright: — <strong>RedazzInc</strong>
                </v-col>
            </v-row>
        </v-container>
    </v-footer>
</template>

<script lang="ts">
import Vue from 'vue';
import LinksCpn from './Links-cpn.vue'
export default Vue.extend({
    name: "Footer-cpn",
    components: {
        LinksCpn,
    },
    data() {
        return {
            icons: [
                'mdi-facebook',
                'mdi-twitter',
                'mdi-linkedin',
                'mdi-instagram',
                'mdi-github',
            ],
        };
    }
});
</script>
