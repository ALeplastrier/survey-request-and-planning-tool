<template>
  <div class="column q-py-sm">
    <div class="column q-gutter-y-sm">
      <div class="app-big-heading q-px-md">Welcome to the ASB {{ title }}</div>

      <q-list>
        <q-expansion-item
          :value="expandedAbout"
          :header-class="headerClass"
          icon="error_outline"
          label="About"
        >
          <div class="q-px-md q-pb-sm column q-gutter-y-sm">
            <div>
              The ASB SCT was developed by FrontierSI on behalf of AusSeabed and
              captures three record types, a survey plan, a survey request and a
              area of interest profile.
            </div>
            <div>
              The survey plans records the survey’s intended area of interest,
              its specifications and intended deliverable.
            </div>
            <div>
              The survey request record the information required for submission
              to the Hydroscheme Industry Partnership Program (HIPP) review
              panel.
            </div>
            <div>
              The area of interest profile enables an organisation to highlight
              the areas of our marine jurisdiction that are of interest for
              surveying.
            </div>
          </div>
        </q-expansion-item>

        <q-expansion-item
          :value="expandedSurveyPlans"
          :header-class="headerClass"
          icon="app:survey-plan"
          label="Survey Plans"
          caption="Add a new Survey Plan or update existing Survey Plan"
        >
          <div class="q-px-md q-pb-sm q-gutter-y-sm column">
            <div>
              <div>
                The survey plan and associated information has been designed to
                support a number of different activities such as:
              </div>
              <ol class="q-my-xs">
                <li>
                  Adding an upcoming survey to the AusSeabed “Upcoming Surveys”
                  coverage layer
                </li>
                <li>
                  Assist a non-expert user to plan their survey and get support
                  from within the AusSeabed community. Please refer to our FAQ’s
                  “How to get technical support?” for more information.
                </li>
                <li>
                  Allow a user to plan a survey with specifications and generate
                  documentation to support a tender process.
                </li>
              </ol>
            </div>
            <sct-btn
              class="self-center full-width"
              label="Add Basic Survey Plan"
              icon="add"
              :to="'/survey-plan/new'"
            >
              <q-tooltip> Create new basic survey plan </q-tooltip>
            </sct-btn>
          </div>
        </q-expansion-item>

        <q-expansion-item
          :value="expandedSurveyRequests"
          :header-class="headerClass"
          icon="app:survey-request"
          label="HIPP Requests"
          caption="Add a new HIPP Request or update existing HIPP Request"
        >
          <div class="q-px-md q-pb-sm q-gutter-y-sm column">
            <div class="q-gutter-y-sm column">
              <div>
                The Request has been specifically designed to support the
                submission of planned survey programs to the Hydroscheme
                Industry Partnership Program (HIPP).
              </div>
              <div>
                To submit a survey program for consideration to the HIPP please
                click on “Requests” at the top of this window and either “+ ADD
                HIPP REQUEST” or select an already existing record in your list
                to modify.
              </div>
            </div>
            <sct-btn
              class="self-center full-width"
              label="Add a HIPP Request"
              icon="add"
              :to="'/survey-request/new/registration'"
            >
              <q-tooltip> Create a new HIPP Request </q-tooltip>
            </sct-btn>
          </div>
        </q-expansion-item>

        <q-expansion-item
          :value="expandedPriorityAreas"
          :header-class="headerClass"
          icon="app:priority-areas-dark"
          label="Areas of Interest"
          caption="Create or update an Area of Interest"
        >
          <div class="q-px-md q-pb-sm q-gutter-y-sm column">
            <div class="q-gutter-y-sm column">
              <div class="row full-width q-px-lg">
                <q-img class="col" contain src="~assets/nesp-logo.png" />
                <q-img class="col" contain src="~assets/aus-seabed-logo.png" />
              </div>
              <div>
                This version of the Areas of Interest tool was developed by
                AusSeabed in partnership with the National Environmental Science
                Program Marine and Coastal Hub. The tool is designed to help
                users from <u>all sectors</u> across the seabed mapping and
                characterisation community submit and describe Areas of Interest
                for data collection to help create collaboration opportunities.
                Areas created in this section of the system should have value
                that can be categorised under the following themes:
              </div>
              <ul class="q-my-xs">
                <li>Cultural Heritage</li>
                <li>Social/Historical</li>
                <li>Operational</li>
                <li>Economic</li>
                <li>Environmental</li>
              </ul>
              <div>
                Before submitting an area of interest users should check the
                below portals to ensure that there isn’t already open data that
                meets their needs:
              </div>
              <ul class="q-my-xs">
                <li>
                  <a href="https://www.ausseabed.gov.au/data" target="_blank"
                    >AusSeabed</a
                  >
                  Acoustic data, bathymetry, etc
                </li>
                <li>
                  <a
                    href="http://dbforms.ga.gov.au/pls/www/npm.mars.search"
                    target="_blank"
                    >MARS Sediments</a
                  >
                </li>
                <li>
                  <a href="https://squidle.org/" target="_blank">Squidle+</a>
                  Epibenthos organisms / imagery
                </li>
                <li>
                  <a href="https://soi.squidle.org/" target="_blank"
                    >SOI Squidle</a
                  >
                  Epibenthos organisms / imagery
                </li>
                <li>
                  <a href="https://portal.aodn.org.au/" target="_blank"
                    >AODN (all rationales)</a
                  >
                  All data types
                </li>
                <li>
                  <a href="https://obis.org/" target="_blank">OBIS</a>
                  Ecological data; species distributions
                </li>
                <li>
                  <a href="https://www.ala.org.au/" target="_blank">ALA</a>
                  Ecological data; species distributions
                </li>
                <li>
                  <a href="https://seamapaustralia.org/" target="_blank"
                    >SeaMap Australia</a
                  >
                  Biotope
                </li>
                <li>
                  <a href="https://globalarchive.org/" target="_blank"
                    >GlobalArchive</a
                  >
                  Fish, BRUVS data
                </li>
                <li>
                  <a href="https://biocollect.ala.org.au/imsa" target="_blank"
                    >IMSA</a
                  >
                  Biotope, sediment, chemical
                </li>
              </ul>
            </div>
            <sct-btn
              class="self-center full-width"
              label="Add an Area of Interest"
              icon="add"
              :to="'/priority-area-submission/new'"
            >
              <q-tooltip> Add an Area of Interest </q-tooltip>
            </sct-btn>
          </div>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
const _ = require("lodash");

import { errorHandler } from "./mixins/error-handling";
import { permission } from "./mixins/permission";

export default Vue.extend({
  name: `MainHome`,

  mixins: [errorHandler, permission],

  mounted() {},

  methods: {},

  watch: {},

  computed: {
    expandedAbout: function () {
      return true;
    },
    expandedSurveyPlans: function () {
      return false;
    },
    expandedSurveyRequests: function () {
      return false;
    },
    expandedPriorityAreas: function () {
      return false;
    },
    title() {
      return process.env.PRODUCT_NAME;
    },
  },

  data() {
    return {
      headerClass: "bg-grey-3",
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus"></style>
