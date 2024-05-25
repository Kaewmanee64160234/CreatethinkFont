<script lang="ts" setup>
import { useCourseStore } from "@/stores/course.store";
import { ref, watch } from "vue";
import CreateCourseDialog3 from "./CreateCourseDialog3.vue";
import course from "@/services/course";
const courseStore = useCourseStore();
const selectedDate = ref(new Date());
const showDatePicker = ref(false);
const selectedTime = ref("00:00");
const showTimePicker = ref(false);
const showDatePicker2 = ref(false);
const selectedTime2 = ref("00:00");
const showTimePicker2 = ref(false);
const selectedDate3 = ref(new Date());
const showDatePicker3 = ref(false);
const selectedTime3 = ref("00:00");
const showTimePicker3 = ref(false);
const showDatePicker4 = ref(false);
const selectedTime4 = ref("00:00");
const showTimePicker4 = ref(false);
const session = ref("");
const credit = ref(0);
const stdAmount = ref(0);
const fullScore = ref(0);

function formatThaiDate(date: Date) {
  return date
    .toLocaleDateString("th-TH", {
      weekday: "long", // Full weekday name
    })
    .replace(".", "");
}

function formatISODateTime(date: Date, time: string): string {
  const [hours, minutes] = time.split(":");
  date.setHours(parseInt(hours), parseInt(minutes));
  return date.toISOString();
}

// function formatThaiTime(time: string) {
//   const [hours, minutes] = time.split(":");
//   const date = new Date();
//   date.setHours(parseInt(hours), parseInt(minutes));
//   return date.toLocaleTimeString("th-TH", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }

const updateCourse = () => {
  if (courseStore.currentCourse) {
    if (
      credit.value <= 0 ||
      session.value === "" ||
      stdAmount.value <= 0 ||
      fullScore.value <= 0
    ) {
      console.log("no data");
      return;
    } else {
      courseStore.currentCourse.credit = credit.value;
      courseStore.currentCourse.session = session.value;
      courseStore.currentCourse.stdAmount = stdAmount.value;
      courseStore.currentCourse.fullScore = fullScore.value;
      courseStore.currentCourse.timeInLec = new Date(
        formatISODateTime(selectedDate.value, selectedTime.value)
      );
      courseStore.currentCourse.timeOutLec = new Date(
        formatISODateTime(selectedDate.value, selectedTime2.value)
      );
      if (courseStore.currentCourse.typeCourses === "เลคเชอร์และแลป") {
        courseStore.currentCourse.timeInLab = new Date(
          formatISODateTime(selectedDate3.value, selectedTime3.value)
        );
        courseStore.currentCourse.timeOutLab = new Date(
          formatISODateTime(selectedDate.value, selectedTime4.value)
        );
      }
      courseStore.updateCourse(
        courseStore.currentCourse.coursesId,
        courseStore.currentCourse
      );
      // console.log("currentCourseID", courseStore.currentCourse.coursesId);
      // console.log("currentCourse", courseStore.currentCourse);
    }
  }
  courseStore.showCreateDialog2 = false;
  courseStore.showCreateDialog = false;
  courseStore.getCourseByTeachId("64160049");
};
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-card style="width: 30vw; height: auto">
        <v-card-title style="margin-left: 3%; margin-top: 1%">
          <h2>รายละเอียดห้องเรียน</h2>
        </v-card-title>
        <v-card variant="outlined" class="textarea" style="width: 27vw; height: auto">
          <v-card-title>
            <h3 style="margin-bottom: 2%">สร้างรายละเอียดวิชา</h3>
            <v-row style="height: 8vh">
              <v-col cols="3">
                <p>กลุ่มเรียนที่</p>
              </v-col>
              <v-col align="left" class="fields">
                <v-text-field
                  variant="outlined"
                  v-model="session"
                  :rules="[(v) => !!v || 'โปรดกรอกกลุ่มที่เรียนให้ถูกต้อง']"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row style="height: 8vh">
              <v-col cols="3">
                <p>จำนวนหน่วยกิต</p>
              </v-col>
              <v-col align="left" class="fields">
                <v-text-field
                  variant="outlined"
                  v-model="credit"
                  :rules="[
                    (v) => !!v || 'โปรดกรอกจำนวนหน่วยกิตให้ถูกต้อง',
                    (v) => /^[0-9]+$/.test(v) || 'โปรดกรอกตัวเลขเท่านั้น',
                  ]"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row style="height: 8vh">
              <v-col cols="3">
                <p>จำนวนนักเรียน</p>
              </v-col>
              <v-col align="left" class="fields">
                <v-text-field
                  variant="outlined"
                  v-model="stdAmount"
                  :rules="[
                    (v) => !!v || 'โปรดกรอกจำนวนนักเรียนให้ถูกต้อง',
                    (v) => /^[0-9]+$/.test(v) || 'โปรดกรอกตัวเลขเท่านั้น',
                  ]"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row style="height: 8vh">
              <v-col cols="2">
                <p>วันที่</p>
              </v-col>
              <v-col>
                <v-menu
                  v-model="showDatePicker"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  position-x="right"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      label="เวลาเริ่มเลคเชอร์"
                      v-model="selectedDate"
                      :value="formatThaiDate(selectedDate)"
                      variant="outlined"
                      readonly
                      @click:append="showDatePicker = !showDatePicker"
                    >
                      <template v-slot:append>
                        <v-icon v-bind="props">mdi-calendar-clock-outline</v-icon>
                      </template>
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="selectedDate"
                    show-adjacent-month
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="auto">
                <p>เวลา</p>
              </v-col>
              <v-col>
                <v-menu
                  v-model="showTimePicker"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  position-x="right"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-model="selectedTime"
                      variant="outlined"
                      readonly
                      label="วันที่เริ่มเลคเชอร์"
                    >
                      <template v-slot:append>
                        <v-icon v-bind="props">mdi-clock-outline</v-icon>
                      </template>
                    </v-text-field>
                  </template>
                  <v-time-picker v-model="selectedTime" format="24hr"></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row style="height: 8vh">
              <v-col cols="2">
                <p>วันที่</p>
              </v-col>
              <v-col>
                <v-menu
                  v-model="showDatePicker2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  position-x="right"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      label="วันที่เลิกเลคเชอร์"
                      v-model="selectedDate"
                      :value="formatThaiDate(selectedDate)"
                      variant="outlined"
                      readonly
                      @click:append="showDatePicker2 = !showDatePicker2"
                    >
                      <template v-slot:append>
                        <v-icon v-bind="props">mdi-calendar-clock-outline</v-icon>
                      </template>
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="selectedDate"
                    show-adjacent-month
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="auto">
                <p>เวลา</p>
              </v-col>
              <v-col>
                <v-menu
                  v-model="showTimePicker2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  position-x="right"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-model="selectedTime2"
                      variant="outlined"
                      readonly
                      label="เวลาเลิกเลคเชอร์"
                    >
                      <template v-slot:append>
                        <v-icon v-bind="props">mdi-clock-outline</v-icon>
                      </template>
                    </v-text-field>
                  </template>
                  <v-time-picker v-model="selectedTime2" format="24hr"></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row
              style="height: 8vh"
              v-if="courseStore.currentCourse?.typeCourses === 'เลคเชอร์และแลป'"
            >
              <v-col cols="2">
                <p>วันที่</p>
              </v-col>
              <v-col>
                <v-menu
                  v-model="showDatePicker3"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  position-x="right"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      label="วันที่เริ่มแลป"
                      v-model="selectedDate3"
                      :value="formatThaiDate(selectedDate3)"
                      variant="outlined"
                      readonly
                      @click:append="showDatePicker3 = !showDatePicker3"
                    >
                      <template v-slot:append>
                        <v-icon v-bind="props">mdi-calendar-clock-outline</v-icon>
                      </template>
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="selectedDate3"
                    show-adjacent-month
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="auto">
                <p>เวลา</p>
              </v-col>
              <v-col>
                <v-menu
                  v-model="showTimePicker3"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  position-x="right"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-model="selectedTime3"
                      variant="outlined"
                      readonly
                      label="เวลาเริ่มแลป"
                    >
                      <template v-slot:append>
                        <v-icon v-bind="props">mdi-clock-outline</v-icon>
                      </template>
                    </v-text-field>
                  </template>
                  <v-time-picker v-model="selectedTime3" format="24hr"></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row
              style="height: 8vh"
              v-if="courseStore.currentCourse?.typeCourses === 'เลคเชอร์และแลป'"
            >
              <v-col cols="2">
                <p>วันที่</p>
              </v-col>
              <v-col>
                <v-menu
                  v-model="showDatePicker4"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  position-x="right"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      label="วันที่เลิกแลป"
                      v-model="selectedDate3"
                      :value="formatThaiDate(selectedDate3)"
                      variant="outlined"
                      readonly
                      @click:append="showDatePicker4 = !showDatePicker4"
                    >
                      <template v-slot:append>
                        <v-icon v-bind="props">mdi-calendar-clock-outline</v-icon>
                      </template>
                    </v-text-field>
                  </template>
                  <v-date-picker
                    v-model="selectedDate3"
                    show-adjacent-month
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="auto">
                <p>เวลา</p>
              </v-col>
              <v-col>
                <v-menu
                  v-model="showTimePicker4"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  position-x="right"
                >
                  <template v-slot:activator="{ props }">
                    <v-text-field
                      v-model="selectedTime4"
                      variant="outlined"
                      readonly
                      label="เวลาเลิกแลป"
                    >
                      <template v-slot:append>
                        <v-icon v-bind="props">mdi-clock-outline</v-icon>
                      </template>
                    </v-text-field>
                  </template>
                  <v-time-picker v-model="selectedTime4" format="24hr"></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row style="height: 8vh; margin-bottom: 2%">
              <v-col cols="3">
                <p>คะแนนเต็ม</p>
              </v-col>
              <v-col align="left" class="fields">
                <v-text-field
                  variant="outlined"
                  v-model="fullScore"
                  :rules="[
                    (v) => !!v || 'โปรดกรอกคะแนนเต็มให้ถูกต้อง',
                    (v) => /^[0-9]+$/.test(v) || 'โปรดกรอกตัวเลขเท่านั้น',
                  ]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-title>
        </v-card>
        <v-card-actions class="actions">
          <v-btn @click="courseStore.closeDialog">ยกเลิก</v-btn>
          <v-btn @click="updateCourse()" class="colorText">เสร็จสิ้น </v-btn>
        </v-card-actions>
        <v-dialog v-model="courseStore.showCreateDialog3" persistent>
          <CreateCourseDialog3 />
        </v-dialog>
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

.font-bold {
  font-weight: bold;
}

.fields {
  margin-left: 2%;
}
</style>
