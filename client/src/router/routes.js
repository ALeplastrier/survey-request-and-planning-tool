import Login from 'components/login.vue'
import Main from 'components/Main.vue'

import UavHome from 'components/uav/Home.vue'
import UavSurvey from 'components/uav/Survey.vue'
import UavTender from 'components/uav/Tender.vue'
import UavSession from 'components/uav/Session.vue'
import UavProjects from 'components/uav/Projects.vue'
import ProjectMetadata from 'components/uav/ProjectMetadata.vue'
import SurveyTechnicalSpecification
  from 'components/uav/survey-technical-specification.vue'
import SurveyFile from 'components/uav/survey-file.vue'
import SurveyDeliverables from 'components/uav/survey-deliverables.vue'

import ProjectMain from 'components/project-main.vue'

import CustomDataset from 'components/controls/CreateCustomDataset.vue'
import StandardDataset from 'components/controls/CreateStandardDataset.vue'

export default [
    { path: '/', component: Main },
    { path: '/login', component: Login },

    { path: '/customdataset/:id', name: 'CreateCustomDataset', component: CustomDataset },
    { path: '/standarddataset/:id', name: 'StandardDataset', component: StandardDataset },

    { path: '/uav', component: UavHome },
    { path: '/uav/survey', component: UavSurvey },
    { path: '/uav/tender', component: UavTender },
    { path: '/uav/session', component: UavSession },
    { path: '/uav/project', component: UavProjects },
    {
      path: '/survey/:id',
      component: ProjectMain,
      children: [
        {
          path: 'summary',
          component: ProjectMetadata,
        },
        {
          path: 'specifications',
          component: SurveyTechnicalSpecification,
        },
        {
          path: 'deliverables',
          component: SurveyDeliverables,
        },
        {
          path: 'attachments',
          component: SurveyFile,
        },
      ]
    },

    { path: '/project-metadata', component: ProjectMetadata },
    { path: '/project-metadata/:id', component: ProjectMetadata },
    { path: '/survey-technical-specification/:id',
      component: SurveyTechnicalSpecification},
    { path: '/survey-file/:id', component: SurveyFile},
    { path: '/survey-deliverables/:id', component: SurveyDeliverables},

    {
      path: '/auth/callback',
      component: {
        template: '<div class="auth-component"></div>'
      }
    }
]
