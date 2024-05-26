<script lang="ts" setup>
import { useCourseStore } from "@/stores/course.store";
import { useEnrollmentStore } from "@/stores/enrollment.store";
const courseStore = useCourseStore();
const enrollmentStore = useEnrollmentStore();
const formatThaiDate = (isoDateTime: string | undefined): string => {
  if (!isoDateTime) {
    return "";
  }
  const date = new Date(isoDateTime);
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: "long" };
  const timeOptions: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" };

  const dateString = date.toLocaleDateString("th-TH", dateOptions).replace(".", "");
  const timeString = date.toLocaleTimeString("th-TH", timeOptions);

  return `${dateString} ${timeString}`;
};

const saveEnrollment = async () => {
  courseStore.closeDialog();
  await enrollmentStore.getCourseByStudentId("64160144"); ///mockup data
};

const cancel = async () => {
  if (enrollmentStore.currentEnrollment) {
    await enrollmentStore.deleteEnrollment(
      enrollmentStore.currentEnrollment!.enrollmentId!
    );
    courseStore.showDeleteDialog = false;
    await enrollmentStore.getCourseByStudentId("64160144");
    courseStore.closeDialog();
  }
};
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-card style="width: 30vw">
        <v-card-title style="margin-left: 3%; margin-top: 1%">
          <h2>ข้อมูลชั้นเรียน</h2>
        </v-card-title>
        <v-card variant="outlined" class="cards textarea">
          <v-card-title>
            <h3>{{ enrollmentStore.currentEnrollment?.course?.nameCourses }}</h3>
          </v-card-title>
          <v-card-text>
            <div>
              กลุ่มเรียน: {{ enrollmentStore.currentEnrollment?.course?.session }}
            </div>
            <div>
              รหัสวิชา: {{ enrollmentStore.currentEnrollment?.course?.coursesId }}
            </div>
            <div>
              จำนวนหน่วยกิต: {{ enrollmentStore.currentEnrollment?.course?.credit }}
            </div>
            <div>
              จำนวนนักเรียน: {{ enrollmentStore.currentEnrollment?.course?.stdAmount }}
            </div>
            <div>
              อาจารย์ผู้สอน:
              {{ enrollmentStore.currentEnrollment?.course?.user?.firstName }}
            </div>
            <div>
              เวลาเริ่มเรียนเลคเชอร์:
              {{ formatThaiDate(enrollmentStore.currentEnrollment?.course?.timeInLec) }}
            </div>
            <div>
              เวลาเลิกเรียนเลคเชอร์:
              {{ formatThaiDate(enrollmentStore.currentEnrollment?.course?.timeOutLec) }}
            </div>
            <div
              v-if="
                enrollmentStore.currentEnrollment?.course?.typeCourses ===
                'เลคเชอร์และแลป'
              "
            >
              เวลาเริ่มเรียนแลป:
              {{ formatThaiDate(enrollmentStore.currentEnrollment?.course?.timeInLab) }}
            </div>
            <div
              v-if="
                enrollmentStore.currentEnrollment?.course?.typeCourses ===
                'เลคเชอร์และแลป'
              "
            >
              เวลาเลิกเรียนแลป:
              {{ formatThaiDate(enrollmentStore.currentEnrollment?.course?.timeOutLab) }}
            </div>
            <div>
              คะแนนเต็ม: {{ enrollmentStore.currentEnrollment?.course?.fullScore }}
            </div>
          </v-card-text>
        </v-card>
        <v-card-actions class="actions">
          <v-btn @click="cancel">ยกเลิก</v-btn>
          <v-btn @click="saveEnrollment" class="colorText">เข้าร่วม</v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<style>
.actions {
  justify-content: flex-end;
}

.cards {
  width: 27vw;
  margin: 2%;
}

.textarea {
  margin-left: 5%;
  border-color: #e0e0e0;
}

.colorText {
  color: #2a6ec5;
}
</style>
