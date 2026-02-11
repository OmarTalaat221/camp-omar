import React from "react";
import Default from "../component/general/dashboard/default";
import ListStudents from "../camp-app/camp-pages/students/list";
import Levels from "../camp-app/camp-pages/Levels/Levels";
import Exams from "../camp-app/camp-pages/Exams/Exams";
import Posts from "../camp-app/camp-pages/Levels/Posts/Posts";
import PostData from "../camp-app/camp-pages/Levels/Posts/PostData/PostData";
import Videos from "../camp-app/camp-pages/Levels/Videos/Videos";
import Questions from "../camp-app/camp-pages/Levels/Questions/Questions";
import Students from "../camp-app/camp-pages/Levels/Students/Students";
import Feedback from "../camp-app/camp-pages/Feedback/Feedback";
import SubscriptionList from "../camp-app/camp-pages/Subscription/SubscriptionList";
import StudentActivation from "../camp-app/camp-pages/Subscription/StudentActivation";
import GroupsList from "../camp-app/camp-pages/Groups/GroupsList";
import GroupSessions from "../camp-app/camp-pages/Groups/GroupSessions";
import BranchesList from "../camp-app/camp-pages/Branches/BranchesList";
import GroupSessionStudents from "../camp-app/camp-pages/Groups/GroupSessionStudents";
import LevelSections from "../camp-app/camp-pages/Levels/LevelSections";
import Pdfs from "../camp-app/camp-pages/Levels/Pdfs/Pdfs";
import { PowerPoint } from "../camp-app/camp-pages/Levels/PowerPoint/PowerPoint";
import LevelStudents from "../camp-app/camp-pages/Levels/LevelStudents/LevelStudents";
import StudentAnswers from "../camp-app/camp-pages/Levels/LevelStudents/StudentAnswers";
import { StudentCertificates } from "../camp-app/camp-pages/Certificates/StudentCertificates";
import LevelPlacmentAttachment from "../camp-app/camp-pages/Levels/LevelPlacmentAttachment";
import AnalysisQuestion from "../camp-app/camp-pages/Levels/AnalysisQuestion";
import Chat from "../camp-app/camp-pages/Chat/Chat";
import Certification from "../component/common/Certeficate/Certification";
import { UnReadMasseges } from "../camp-app/camp-pages/Chat/UnReadMasseges";
import { Roundes } from "../camp-app/camp-pages/Roundes/Roundes";
import GroupStudents from "../camp-app/camp-pages/Groups/GroupStudents";
import { DashboardData } from "../camp-app/camp-pages/DashboardData/DashboardData";
import Expenses from "../camp-app/camp-pages/Expenses/Expenses";
import Refunds from "../camp-app/camp-pages/Refundes/Refunds";
import Login from "../camp-app/camp-pages/Login/Login";
import Permessions from "../camp-app/camp-pages/Permessions/Permessions";
import Teckets from "./../camp-app/camp-pages/Teckets/Teckets";
import TeketDetails from "../camp-app/camp-pages/TeketDetails/TeketDetails";
import StudentProfile from "../camp-app/camp-pages/students/StudentProfile";
import TracksList from "../camp-app/camp-pages/Tracks/TracksList";
import Debtors from "../camp-app/Debtors/Debtors";
import BranchPayment from "../camp-app/camp-pages/Branches/BranchPayment";
import BranchDetails from "../camp-app/camp-pages/Branches/BranchDetails";
import Notes from "../camp-app/Notes/Notes";
import Absence from "../camp-app/camp-pages/Absence/Absence";
import Questionnaire from "../camp-app/camp-pages/Questionnaire/Questionnaire";
import QuestionnaireList from "../camp-app/camp-pages/Questionnaire/QuestionnaireList";
import FormsStudentRespons from "../camp-app/camp-pages/Questionnaire/FormsStudentRespons";
import Voices from "../camp-app/camp-pages/Voices/Voices";
import BranchStudents from "../camp-app/camp-pages/Branches/BranchStudents";
import UpgradeStudentRound from "../camp-app/camp-pages/Roundes/UpgradeStudentRound";
import GroupInstructions from "../camp-app/camp-pages/Instructions/instructions";
import UpgradeRounds from "../camp-app/camp-pages/Roundes/UpgradeRounds";
import PlaceRate from "../camp-app/camp-pages/PlaceRate/PlaceRate";

export const AdminData = JSON.parse(localStorage.getItem("AdminData"));

export const routes =
  AdminData?.length > 0 && AdminData[0]?.type == "super_admin"
    ? [
        {
          path: "*",
          Component: <DashboardData />,
        },
        {
          path: `${process.env.PUBLIC_URL}/dashboard`,
          Component: <DashboardData />,
        },
        {
          path: `${process.env.PUBLIC_URL}/teckets`,
          Component: <Teckets />,
        },
        {
          path: `${process.env.PUBLIC_URL}/instructions`,
          Component: <GroupInstructions />,
        },
        {
          path: `${process.env.PUBLIC_URL}/teckets/:id`,
          Component: <TeketDetails />,
        },

        {
          path: `${process.env.PUBLIC_URL}/students/list`,
          Component: <ListStudents />,
        },
        {
          path: `/students/list/:student_id/profile`,
          Component: <StudentProfile />,
        },
        {
          path: `${process.env.PUBLIC_URL}/students/:student_id/level/certificates`,
          Component: <StudentCertificates />,
        },
        {
          path: `${process.env.PUBLIC_URL}/Tracks/list`,
          Component: <TracksList />,
        },
        {
          path: `${process.env.PUBLIC_URL}/levels/list`,
          Component: <Levels />,
        },
        {
          path: `${process.env.PUBLIC_URL}/levels/:level_id/students`,
          Component: <LevelStudents />,
        },
        {
          path: `${process.env.PUBLIC_URL}/levels/:level_id/students/:student_id/answers`,
          Component: <StudentAnswers />,
        },
        {
          path: `${process.env.PUBLIC_URL}/levels/exams`,
          Component: <Exams />,
        },
        {
          path: `${process.env.PUBLIC_URL}/levels/placementAttachment`,
          Component: <LevelPlacmentAttachment />,
        },
        {
          path: `${process.env.PUBLIC_URL}/levels/AnalysisQuestion`,
          Component: <AnalysisQuestion />,
        },
        {
          path: `${process.env.PUBLIC_URL}/levels/:levelId/sections`,
          Component: <LevelSections />,
        },

        {
          path: `${process.env.PUBLIC_URL}/posts`,
          Component: <Posts />,
        },
        {
          path: `${process.env.PUBLIC_URL}/posts/:postId/postDetails`,
          Component: <PostData />,
        },
        {
          path: `${process.env.PUBLIC_URL}/levels/:levelId/sections/:section_id/videos`,
          Component: <Videos />,
        },
        {
          path: `${process.env.PUBLIC_URL}/levels/:levelId/sections/:section_id/Examquestions`,
          Component: <Questions />,
        },
        {
          path: `${process.env.PUBLIC_URL}/levels/:levelId/sections/:section_id/pdfs`,
          Component: <Pdfs />,
        },
        {
          path: `${process.env.PUBLIC_URL}/levels/:levelId/sections/:section_id/voices`,
          Component: <Voices />,
        },
        {
          path: `${process.env.PUBLIC_URL}/levels/:levelId/sections/:section_id/powerpoint`,
          Component: <PowerPoint />,
        },
        {
          path: `${process.env.PUBLIC_URL}/levels/:levelId/students`,
          Component: <Students />,
        },
        {
          path: `${process.env.PUBLIC_URL}/feedback`,
          Component: <Feedback />,
        },
        {
          path: `${process.env.PUBLIC_URL}/SubscriptionList`,
          Component: <SubscriptionList />,
        },
        {
          path: `${process.env.PUBLIC_URL}/studentActivation`,
          Component: <StudentActivation />,
        },
        {
          path: `${process.env.PUBLIC_URL}/groups`,
          Component: <GroupsList />,
        },
        {
          path: `${process.env.PUBLIC_URL}/branches/:branch_id/Roundes/:round_id/groups/:group_id/sessions`,
          Component: <GroupSessions />,
        },
        {
          path: `${process.env.PUBLIC_URL}/branches/:branch_id/Roundes/:round_id/groups/:group_id/students`,
          Component: <GroupStudents />,
        },
        {
          path: `${process.env.PUBLIC_URL}/groups/:group_id/students`,
          Component: <GroupStudents />,
        },
        {
          path: `${process.env.PUBLIC_URL}/groups/:group_id/sessions`,
          Component: <GroupSessions />,
        },
        {
          path: `${process.env.PUBLIC_URL}/groups/:group_id/sessions/:session_id/students`,
          Component: <GroupSessionStudents />,
        },
        {
          path: `${process.env.PUBLIC_URL}/branches`,
          Component: <BranchesList />,
        },
        {
          path: `${process.env.PUBLIC_URL}/branches/:branch_id/students`,
          Component: <BranchStudents />,
        },
        {
          path: `${process.env.PUBLIC_URL}/branches/:branch_id/Roundes`,
          Component: <Roundes />,
        },
        {
          path: `${process.env.PUBLIC_URL}/roundes/:round_id/upgrade`,
          Component: <UpgradeStudentRound />,
        },
        {
          path: `${process.env.PUBLIC_URL}/roundes/:round_id/upgrade-round`,
          Component: <UpgradeRounds />,
        },
        {
          path: `${process.env.PUBLIC_URL}groups/:group_id/students/:student_id/chat`,
          Component: <Chat />,
        },
        {
          path: `${process.env.PUBLIC_URL}/certificate/:student_id`,
          Component: <Certification />,
        },
        {
          path: `${process.env.PUBLIC_URL}/unReadMasseges`,
          Component: <UnReadMasseges />,
        },
        {
          path: `${process.env.PUBLIC_URL}/Expenses`,
          Component: <Expenses />,
        },
        {
          path: `${process.env.PUBLIC_URL}/Refunds`,
          Component: <Refunds />,
        },
        {
          path: `${process.env.PUBLIC_URL}/debtors`,
          Component: <Debtors />,
        },
        {
          path: `${process.env.PUBLIC_URL}/branch-payments`,
          Component: <BranchPayment />,
        },

        {
          path: `${process.env.PUBLIC_URL}/branch-payments/:branch_id`,
          Component: <BranchDetails />,
        },
        {
          path: `${process.env.PUBLIC_URL}/notes`,
          Component: <Notes />,
        },
        {
          path: `${process.env.PUBLIC_URL}/absence`,
          Component: <Absence />,
        },
        {
          path: `${process.env.PUBLIC_URL}/admins`,
          Component: <Permessions />,
        },
        {
          path: `${process.env.PUBLIC_URL}/questionnaire`,
          Component: <Questionnaire />,
        },
        {
          path: `${process.env.PUBLIC_URL}/forms_list`,
          Component: <QuestionnaireList />,
        },
        {
          path: `${process.env.PUBLIC_URL}/forms_students_repsonse/:formId/:levelId`,
          Component: <FormsStudentRespons />,
        },
        {
          path: `${process.env.PUBLIC_URL}/place-rate`,
          Component: <PlaceRate />,
        },
      ]
    : AdminData?.length > 0 && AdminData[0]?.type == "employee"
      ? [
          {
            path: "*",
            Component: <DashboardData />,
          },
          {
            path: `${process.env.PUBLIC_URL}/dashboard`,
            Component: <DashboardData />,
          },
          {
            path: `${process.env.PUBLIC_URL}/teckets`,
            Component: <Teckets />,
          },
          {
            path: `${process.env.PUBLIC_URL}/teckets/:id`,
            Component: <TeketDetails />,
          },
          {
            path: `${process.env.PUBLIC_URL}/instructions`,
            Component: <GroupInstructions />,
          },

          {
            path: `${process.env.PUBLIC_URL}/students/list`,
            Component: <ListStudents />,
          },
          {
            path: `/students/list/:student_id/profile`,
            Component: <StudentProfile />,
          },
          {
            path: `${process.env.PUBLIC_URL}/students/:student_id/level/certificates`,
            Component: <StudentCertificates />,
          },
          {
            path: `${process.env.PUBLIC_URL}/Tracks/list`,
            Component: <TracksList />,
          },
          {
            path: `${process.env.PUBLIC_URL}/levels/list`,
            Component: <Levels />,
          },
          {
            path: `${process.env.PUBLIC_URL}/levels/:level_id/students`,
            Component: <LevelStudents />,
          },
          {
            path: `${process.env.PUBLIC_URL}/levels/:level_id/students/:student_id/answers`,
            Component: <StudentAnswers />,
          },
          {
            path: `${process.env.PUBLIC_URL}/levels/exams`,
            Component: <Exams />,
          },
          {
            path: `${process.env.PUBLIC_URL}/levels/placementAttachment`,
            Component: <LevelPlacmentAttachment />,
          },
          {
            path: `${process.env.PUBLIC_URL}/levels/AnalysisQuestion`,
            Component: <AnalysisQuestion />,
          },
          {
            path: `${process.env.PUBLIC_URL}/levels/:levelId/sections`,
            Component: <LevelSections />,
          },
          {
            path: `${process.env.PUBLIC_URL}/posts`,
            Component: <Posts />,
          },
          {
            path: `${process.env.PUBLIC_URL}/posts/:postId/postDetails`,
            Component: <PostData />,
          },
          {
            path: `${process.env.PUBLIC_URL}/levels/:levelId/sections/:section_id/videos`,
            Component: <Videos />,
          },
          {
            path: `${process.env.PUBLIC_URL}/levels/:levelId/sections/:section_id/Examquestions`,
            Component: <Questions />,
          },
          {
            path: `${process.env.PUBLIC_URL}/levels/:levelId/sections/:section_id/pdfs`,
            Component: <Pdfs />,
          },
          {
            path: `${process.env.PUBLIC_URL}/levels/:levelId/sections/:section_id/voices`,
            Component: <Voices />,
          },
          {
            path: `${process.env.PUBLIC_URL}/levels/:levelId/sections/:section_id/powerpoint`,
            Component: <PowerPoint />,
          },
          {
            path: `${process.env.PUBLIC_URL}/levels/:levelId/students`,
            Component: <Students />,
          },
          {
            path: `${process.env.PUBLIC_URL}/feedback`,
            Component: <Feedback />,
          },
          {
            path: `${process.env.PUBLIC_URL}/SubscriptionList`,
            Component: <SubscriptionList />,
          },
          {
            path: `${process.env.PUBLIC_URL}/studentActivation`,
            Component: <StudentActivation />,
          },
          {
            path: `${process.env.PUBLIC_URL}/groups`,
            Component: <GroupsList />,
          },
          {
            path: `${process.env.PUBLIC_URL}/branches/:branch_id/Roundes/:round_id/groups/:group_id/sessions`,
            Component: <GroupSessions />,
          },
          {
            path: `${process.env.PUBLIC_URL}/branches/:branch_id/Roundes/:round_id/groups/:group_id/students`,
            Component: <GroupStudents />,
          },
          {
            path: `${process.env.PUBLIC_URL}/groups/:group_id/students`,
            Component: <GroupStudents />,
          },
          {
            path: `${process.env.PUBLIC_URL}/groups/:group_id/sessions`,
            Component: <GroupSessions />,
          },
          {
            path: `${process.env.PUBLIC_URL}/groups/:group_id/sessions/:session_id/students`,
            Component: <GroupSessionStudents />,
          },
          {
            path: `${process.env.PUBLIC_URL}/branches`,
            Component: <BranchesList />,
          },
          {
            path: `${process.env.PUBLIC_URL}/branches/:branch_id/students`,
            Component: <BranchStudents />,
          },
          {
            path: `${process.env.PUBLIC_URL}/branches/:branch_id/Roundes`,
            Component: <Roundes />,
          },
          {
            path: `${process.env.PUBLIC_URL}groups/:group_id/students/:student_id/chat`,
            Component: <Chat />,
          },
          {
            path: `${process.env.PUBLIC_URL}/certificate/:student_id`,
            Component: <Certification />,
          },
          {
            path: `${process.env.PUBLIC_URL}/unReadMasseges`,
            Component: <UnReadMasseges />,
          },
          {
            path: `${process.env.PUBLIC_URL}/Expenses`,
            Component: <Expenses />,
          },
          {
            path: `${process.env.PUBLIC_URL}/Refunds`,
            Component: <Refunds />,
          },
          {
            path: `${process.env.PUBLIC_URL}/debtors`,
            Component: <Debtors />,
          },
          {
            path: `${process.env.PUBLIC_URL}/branch-payments`,
            Component: <BranchPayment />,
          },

          {
            path: `${process.env.PUBLIC_URL}/branch-payments/:branch_id`,
            Component: <BranchDetails />,
          },
          {
            path: `${process.env.PUBLIC_URL}/notes`,
            Component: <Notes />,
          },
          {
            path: `${process.env.PUBLIC_URL}/absence`,
            Component: <Absence />,
          },
          {
            path: `${process.env.PUBLIC_URL}/admins`,
            Component: <Permessions />,
          },
          {
            path: `${process.env.PUBLIC_URL}/questionnaire`,
            Component: <Questionnaire />,
          },
          {
            path: `${process.env.PUBLIC_URL}/forms_list`,
            Component: <QuestionnaireList />,
          },
          {
            path: `${process.env.PUBLIC_URL}/forms_students_repsonse/:formId/:levelId`,
            Component: <FormsStudentRespons />,
          },
          {
            path: `${process.env.PUBLIC_URL}/place-rate`,
            Component: <PlaceRate />,
          },
        ]
      : AdminData?.length > 0 && AdminData[0]?.type == "superVisor"
        ? [
            {
              path: "*",
              Component: <DashboardData />,
            },
            {
              path: `${process.env.PUBLIC_URL}/dashboard`,
              Component: <DashboardData />,
            },
            {
              path: `${process.env.PUBLIC_URL}/teckets`,
              Component: <Teckets />,
            },
            {
              path: `${process.env.PUBLIC_URL}/teckets/:id`,
              Component: <TeketDetails />,
            },

            {
              path: `${process.env.PUBLIC_URL}/students/list`,
              Component: <ListStudents />,
            },
            {
              path: `/students/list/:student_id/profile`,
              Component: <StudentProfile />,
            },
            {
              path: `${process.env.PUBLIC_URL}/students/:student_id/level/certificates`,
              Component: <StudentCertificates />,
            },
            {
              path: `${process.env.PUBLIC_URL}/Tracks/list`,
              Component: <TracksList />,
            },
            {
              path: `${process.env.PUBLIC_URL}/levels/list`,
              Component: <Levels />,
            },
            {
              path: `${process.env.PUBLIC_URL}/levels/:level_id/students`,
              Component: <LevelStudents />,
            },
            {
              path: `${process.env.PUBLIC_URL}/levels/:level_id/students/:student_id/answers`,
              Component: <StudentAnswers />,
            },
            {
              path: `${process.env.PUBLIC_URL}/levels/exams`,
              Component: <Exams />,
            },
            {
              path: `${process.env.PUBLIC_URL}/levels/placementAttachment`,
              Component: <LevelPlacmentAttachment />,
            },
            {
              path: `${process.env.PUBLIC_URL}/levels/AnalysisQuestion`,
              Component: <AnalysisQuestion />,
            },
            {
              path: `${process.env.PUBLIC_URL}/levels/:levelId/sections`,
              Component: <LevelSections />,
            },
            {
              path: `${process.env.PUBLIC_URL}/posts`,
              Component: <Posts />,
            },
            {
              path: `${process.env.PUBLIC_URL}/posts/:postId/postDetails`,
              Component: <PostData />,
            },
            {
              path: `${process.env.PUBLIC_URL}/levels/:levelId/sections/:section_id/videos`,
              Component: <Videos />,
            },
            {
              path: `${process.env.PUBLIC_URL}/levels/:levelId/sections/:section_id/Examquestions`,
              Component: <Questions />,
            },
            {
              path: `${process.env.PUBLIC_URL}/levels/:levelId/sections/:section_id/pdfs`,
              Component: <Pdfs />,
            },
            {
              path: `${process.env.PUBLIC_URL}/levels/:levelId/sections/:section_id/voices`,
              Component: <Voices />,
            },
            {
              path: `${process.env.PUBLIC_URL}/levels/:levelId/sections/:section_id/powerpoint`,
              Component: <PowerPoint />,
            },
            {
              path: `${process.env.PUBLIC_URL}/levels/:levelId/students`,
              Component: <Students />,
            },
            {
              path: `${process.env.PUBLIC_URL}/feedback`,
              Component: <Feedback />,
            },
            {
              path: `${process.env.PUBLIC_URL}/SubscriptionList`,
              Component: <SubscriptionList />,
            },
            {
              path: `${process.env.PUBLIC_URL}/studentActivation`,
              Component: <StudentActivation />,
            },
            {
              path: `${process.env.PUBLIC_URL}/groups`,
              Component: <GroupsList />,
            },
            {
              path: `${process.env.PUBLIC_URL}/branches/:branch_id/Roundes/:round_id/groups/:group_id/sessions`,
              Component: <GroupSessions />,
            },
            {
              path: `${process.env.PUBLIC_URL}/branches/:branch_id/Roundes/:round_id/groups/:group_id/students`,
              Component: <GroupStudents />,
            },
            {
              path: `${process.env.PUBLIC_URL}/groups/:group_id/students`,
              Component: <GroupStudents />,
            },
            {
              path: `${process.env.PUBLIC_URL}/groups/:group_id/sessions`,
              Component: <GroupSessions />,
            },
            {
              path: `${process.env.PUBLIC_URL}/groups/:group_id/sessions/:session_id/students`,
              Component: <GroupSessionStudents />,
            },
            {
              path: `${process.env.PUBLIC_URL}/branches`,
              Component: <BranchesList />,
            },
            {
              path: `${process.env.PUBLIC_URL}/branches/:branch_id/students`,
              Component: <BranchStudents />,
            },
            {
              path: `${process.env.PUBLIC_URL}/branches/:branch_id/Roundes`,
              Component: <Roundes />,
            },
            {
              path: `${process.env.PUBLIC_URL}groups/:group_id/students/:student_id/chat`,
              Component: <Chat />,
            },
            {
              path: `${process.env.PUBLIC_URL}/certificate/:student_id`,
              Component: <Certification />,
            },
            {
              path: `${process.env.PUBLIC_URL}/unReadMasseges`,
              Component: <UnReadMasseges />,
            },
            {
              path: `${process.env.PUBLIC_URL}/Expenses`,
              Component: <Expenses />,
            },
            {
              path: `${process.env.PUBLIC_URL}/Refunds`,
              Component: <Refunds />,
            },
            {
              path: `${process.env.PUBLIC_URL}/instructions`,
              Component: <GroupInstructions />,
            },
            {
              path: `${process.env.PUBLIC_URL}/debtors`,
              Component: <Debtors />,
            },
            {
              path: `${process.env.PUBLIC_URL}/branch-payments`,
              Component: <BranchPayment />,
            },

            {
              path: `${process.env.PUBLIC_URL}/branch-payments/:branch_id`,
              Component: <BranchDetails />,
            },
            {
              path: `${process.env.PUBLIC_URL}/notes`,
              Component: <Notes />,
            },
            {
              path: `${process.env.PUBLIC_URL}/absence`,
              Component: <Absence />,
            },
            {
              path: `${process.env.PUBLIC_URL}/admins`,
              Component: <Permessions />,
            },
            {
              path: `${process.env.PUBLIC_URL}/questionnaire`,
              Component: <Questionnaire />,
            },
            {
              path: `${process.env.PUBLIC_URL}/forms_list`,
              Component: <QuestionnaireList />,
            },
            {
              path: `${process.env.PUBLIC_URL}/forms_students_repsonse/:formId/:levelId`,
              Component: <FormsStudentRespons />,
            },
            {
              path: `${process.env.PUBLIC_URL}/place-rate`,
              Component: <PlaceRate />,
            },
          ]
        : AdminData?.length > 0 && AdminData[0]?.type == "instructor"
          ? [
              {
                path: "*",
                Component: <DashboardData />,
              },
              {
                path: `${process.env.PUBLIC_URL}/dashboard`,
                Component: <DashboardData />,
              },
              {
                path: `${process.env.PUBLIC_URL}/teckets`,
                Component: <Teckets />,
              },
              {
                path: `${process.env.PUBLIC_URL}/instructions`,
                Component: <GroupInstructions />,
              },

              {
                path: `${process.env.PUBLIC_URL}/teckets/:id`,
                Component: <TeketDetails />,
              },

              {
                path: `${process.env.PUBLIC_URL}/students/list`,
                Component: <ListStudents />,
              },
              {
                path: `/students/list/:student_id/profile`,
                Component: <StudentProfile />,
              },
              {
                path: `${process.env.PUBLIC_URL}/students/:student_id/level/certificates`,
                Component: <StudentCertificates />,
              },
              {
                path: `${process.env.PUBLIC_URL}/Tracks/list`,
                Component: <TracksList />,
              },
              {
                path: `${process.env.PUBLIC_URL}/levels/list`,
                Component: <Levels />,
              },
              {
                path: `${process.env.PUBLIC_URL}/levels/:level_id/students`,
                Component: <LevelStudents />,
              },
              {
                path: `${process.env.PUBLIC_URL}/levels/:level_id/students/:student_id/answers`,
                Component: <StudentAnswers />,
              },
              {
                path: `${process.env.PUBLIC_URL}/levels/exams`,
                Component: <Exams />,
              },
              {
                path: `${process.env.PUBLIC_URL}/levels/placementAttachment`,
                Component: <LevelPlacmentAttachment />,
              },
              {
                path: `${process.env.PUBLIC_URL}/levels/AnalysisQuestion`,
                Component: <AnalysisQuestion />,
              },
              {
                path: `${process.env.PUBLIC_URL}/levels/:levelId/sections`,
                Component: <LevelSections />,
              },
              {
                path: `${process.env.PUBLIC_URL}/posts`,
                Component: <Posts />,
              },
              {
                path: `${process.env.PUBLIC_URL}/posts/:postId/postDetails`,
                Component: <PostData />,
              },
              {
                path: `${process.env.PUBLIC_URL}/levels/:levelId/sections/:section_id/videos`,
                Component: <Videos />,
              },
              {
                path: `${process.env.PUBLIC_URL}/levels/:levelId/sections/:section_id/Examquestions`,
                Component: <Questions />,
              },
              {
                path: `${process.env.PUBLIC_URL}/levels/:levelId/sections/:section_id/pdfs`,
                Component: <Pdfs />,
              },
              {
                path: `${process.env.PUBLIC_URL}/levels/:levelId/sections/:section_id/voices`,
                Component: <Voices />,
              },
              {
                path: `${process.env.PUBLIC_URL}/levels/:levelId/sections/:section_id/powerpoint`,
                Component: <PowerPoint />,
              },
              {
                path: `${process.env.PUBLIC_URL}/levels/:levelId/students`,
                Component: <Students />,
              },
              {
                path: `${process.env.PUBLIC_URL}/feedback`,
                Component: <Feedback />,
              },
              {
                path: `${process.env.PUBLIC_URL}/SubscriptionList`,
                Component: <SubscriptionList />,
              },
              {
                path: `${process.env.PUBLIC_URL}/studentActivation`,
                Component: <StudentActivation />,
              },
              {
                path: `${process.env.PUBLIC_URL}/groups`,
                Component: <GroupsList />,
              },
              {
                path: `${process.env.PUBLIC_URL}/branches/:branch_id/Roundes/:round_id/groups/:group_id/sessions`,
                Component: <GroupSessions />,
              },
              {
                path: `${process.env.PUBLIC_URL}/branches/:branch_id/Roundes/:round_id/groups/:group_id/students`,
                Component: <GroupStudents />,
              },
              {
                path: `${process.env.PUBLIC_URL}/groups/:group_id/students`,
                Component: <GroupStudents />,
              },
              {
                path: `${process.env.PUBLIC_URL}/groups/:group_id/sessions`,
                Component: <GroupSessions />,
              },
              {
                path: `${process.env.PUBLIC_URL}/groups/:group_id/sessions/:session_id/students`,
                Component: <GroupSessionStudents />,
              },
              {
                path: `${process.env.PUBLIC_URL}/branches`,
                Component: <BranchesList />,
              },
              {
                path: `${process.env.PUBLIC_URL}/branches/:branch_id/students`,
                Component: <BranchStudents />,
              },
              {
                path: `${process.env.PUBLIC_URL}/branches/:branch_id/Roundes`,
                Component: <Roundes />,
              },
              {
                path: `${process.env.PUBLIC_URL}groups/:group_id/students/:student_id/chat`,
                Component: <Chat />,
              },
              {
                path: `${process.env.PUBLIC_URL}/certificate/:student_id`,
                Component: <Certification />,
              },
              {
                path: `${process.env.PUBLIC_URL}/unReadMasseges`,
                Component: <UnReadMasseges />,
              },
              {
                path: `${process.env.PUBLIC_URL}/Expenses`,
                Component: <Expenses />,
              },
              {
                path: `${process.env.PUBLIC_URL}/Refunds`,
                Component: <Refunds />,
              },
              {
                path: `${process.env.PUBLIC_URL}/debtors`,
                Component: <Debtors />,
              },
              {
                path: `${process.env.PUBLIC_URL}/branch-payments`,
                Component: <BranchPayment />,
              },

              {
                path: `${process.env.PUBLIC_URL}/branch-payments/:branch_id`,
                Component: <BranchDetails />,
              },
              {
                path: `${process.env.PUBLIC_URL}/notes`,
                Component: <Notes />,
              },
              {
                path: `${process.env.PUBLIC_URL}/absence`,
                Component: <Absence />,
              },
              {
                path: `${process.env.PUBLIC_URL}/admins`,
                Component: <Permessions />,
              },
              {
                path: `${process.env.PUBLIC_URL}/questionnaire`,
                Component: <Questionnaire />,
              },
              {
                path: `${process.env.PUBLIC_URL}/forms_list`,
                Component: <QuestionnaireList />,
              },
              {
                path: `${process.env.PUBLIC_URL}/forms_students_repsonse/:formId/:levelId`,
                Component: <FormsStudentRespons />,
              },
              {
                path: `${process.env.PUBLIC_URL}/place-rate`,
                Component: <PlaceRate />,
              },
            ]
          : !AdminData
            ? [
                {
                  path: `*`,
                  Component: <Login />,
                },
              ]
            : AdminData?.length > 0
              ? [
                  {
                    path: "*",
                    Component: (
                      <div
                        style={{
                          padding: "40px 20px",
                          textAlign: "center",
                          minHeight: "calc(100vh - 200px)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <h2 style={{ color: "#dc3545", marginBottom: "20px" }}>
                          Access Restricted
                        </h2>
                        <p
                          style={{
                            color: "#6c757d",
                            fontSize: "16px",
                            marginBottom: "30px",
                          }}
                        >
                          You don't have permission to access the admin
                          dashboard.
                          <br />
                          Please contact an administrator for assistance.
                        </p>
                        <button
                          onClick={() => {
                            localStorage.removeItem("AdminData");
                            window.location.reload();
                          }}
                          style={{
                            padding: "10px 20px",
                            backgroundColor: "#dc3545",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "14px",
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    ),
                  },
                ]
              : [];
