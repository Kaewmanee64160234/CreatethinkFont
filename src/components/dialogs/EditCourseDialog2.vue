<script lang="ts" setup>
import { useCourseStore } from "@/stores/course.store";
import { ref, watch } from "vue";
import EditCourseDialog3 from "./EditCourseDialog3.vue";
const courseStore = useCourseStore();
const selectedDate = ref(new Date());
const showDatePicker = ref(false);
const selectedTime = ref("00:00");
const showTimePicker = ref(false);
const selectedDate2 = ref(new Date());
const showDatePicker2 = ref(false);
const selectedTime2 = ref("00:00");
const showTimePicker2 = ref(false);
const selectedDate3 = ref(new Date());
const showDatePicker3 = ref(false);
const selectedTime3 = ref("00:00");
const showTimePicker3 = ref(false);
const selectedDate4 = ref(new Date());
const showDatePicker4 = ref(false);
const selectedTime4 = ref("00:00");
const showTimePicker4 = ref(false);

function formatThaiDate(date: Date) {
  return date
    .toLocaleDateString("th-TH", {
      weekday: "long", // Full weekday name
    })
    .replace(".", "");
}

if (courseStore.currentCourse?.timeInLec) {
  const timeInLec = new Date(courseStore.currentCourse.timeInLec);
  selectedDate.value = timeInLec;
  selectedTime.value = `${timeInLec.getHours()}:${timeInLec.getMinutes()}`;
}
if (courseStore.currentCourse?.timeOutLec) {
  const timeOutLec = new Date(courseStore.currentCourse.timeOutLec);
  selectedDate2.value = timeOutLec;
  selectedTime2.value = `${timeOutLec.getHours()}:${timeOutLec.getMinutes()}`;
}
if (courseStore.currentCourse?.timeInLab) {
  const timeInLab = new Date(courseStore.currentCourse.timeInLab);
  selectedDate3.value = timeInLab;
  selectedTime3.value = `${timeInLab.getHours()}:${timeInLab.getMinutes()}`;
}
if (courseStore.currentCourse?.timeOutLab) {
  const timeOutLab = new Date(courseStore.currentCourse.timeOutLab);
  selectedDate4.value = timeOutLab;
  selectedTime4.value = `${timeOutLab.getHours()}:${timeOutLab.getMinutes()}`;
}

// watch(
//   () => courseStore.currentCourse?.timeInLec,
//   (newVal) => {
//     if (newVal) {
//       const timeInLec = new Date(newVal);
//       selectedDate.value = timeInLec;
//       selectedTime.value = `${timeInLec.getHours()}:${timeInLec.getMinutes()}`;
//     }
//   }
// );

// watch(
//   () => courseStore.currentCourse?.timeOutLec,
//   (newVal) => {
//     if (newVal) {
//       const timeOutLec = new Date(newVal);
//       selectedDate2.value = timeOutLec;
//       selectedTime2.value = `${timeOutLec.getHours()}:${timeOutLec.getMinutes()}`;
//     }
//   }
// );

// watch(
//   () => courseStore.currentCourse?.timeInLab,
//   (newVal) => {
//     if (newVal) {
//       const timeInLab = new Date(newVal);
//       selectedDate3.value = timeInLab;
//       selectedTime3.value = `${timeInLab.getHours()}:${timeInLab.getMinutes()}`;
//     }
//   }
// );

// watch(
//   () => courseStore.currentCourse?.timeOutLab,
//   (newVal) => {
//     if (newVal) {
//       const timeOutLab = new Date(newVal);
//       selectedDate4.value = timeOutLab;
//       selectedTime4.value = `${timeOutLab.getHours()}:${timeOutLab.getMinutes()}`;
//     }
//   }
// );
function formatISODateTime(date: Date, time: string): string {
  const [hours, minutes] = time.split(":");
  date.setHours(parseInt(hours), parseInt(minutes));
  return date.toISOString();
}

const editCourse2 = () => {
  if (courseStore.currentCourse) {
    courseStore.currentCourse.timeInLec = new Date(
      formatISODateTime(selectedDate.value, selectedTime.value)
    );
    courseStore.currentCourse.timeOutLec = new Date(
      formatISODateTime(selectedDate2.value, selectedTime2.value)
    );
    if (courseStore.currentCourse.typeCourses === "เลคเชอร์และแลป") {
      courseStore.currentCourse.timeInLab = new Date(
        formatISODateTime(selectedDate3.value, selectedTime3.value)
      );
      courseStore.currentCourse.timeOutLab = new Date(
        formatISODateTime(selectedDate4.value, selectedTime4.value)
      );
    }
    courseStore.updateCourse(
      courseStore.currentCourse.coursesId,
      courseStore.currentCourse
    );
    // console.log("currentCourseID", courseStore.currentCourse.coursesId);
    console.log("currentCourse", courseStore.currentCourse);
  }
  courseStore.showEditDialog3 = true;
};
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-card style="width: 30vw">
        <v-card-title style="margin-left: 3%; margin-top: 1%">
          <h2>แก้ไขห้องเรียน</h2>
        </v-card-title>
        <v-card variant="outlined" class="textarea" style="width: 27vw">
          <v-card-title>
            <h3 style="margin-bottom: 2%">สร้างรายละเอียดวิชา</h3>
            <v-row style="height: 8vh">
              <v-col cols="3">
                <p>กลุ่มเรียนที่</p>
              </v-col>
              <v-col align="left" class="fields">
                <v-text-field
                  variant="outlined"
                  v-model="courseStore.currentCourse!.session"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row style="height: 8vh">
              <v-col cols="3">
                <p>รหัสวิชา</p>
              </v-col>
              <v-col align="left" class="fields">
                <v-text-field
                  variant="outlined"
                  v-model="courseStore.currentCourse!.coursesId"
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
                  v-model="courseStore.currentCourse!.credit"
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
                  v-model="courseStore.currentCourse!.stdAmount"
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
                      v-model="selectedDate2"
                      :value="formatThaiDate(selectedDate2)"
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
                    v-model="selectedDate2"
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
              v-if="courseStore.currentCourse!.typeCourses === 'เลคเชอร์และแลป'"
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
              v-if="courseStore.currentCourse!.typeCourses === 'เลคเชอร์และแลป'"
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
                      v-model="selectedDate4"
                      :value="formatThaiDate(selectedDate4)"
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
                    v-model="selectedDate4"
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
                  v-model="courseStore.currentCourse!.fullScore"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-title>
        </v-card>
        <v-card-actions class="actions">
          <v-btn @click="courseStore.closeDialog2">ยกเลิก</v-btn>
          <v-btn @click="editCourse2()" class="colorText">ต่อไป </v-btn>
        </v-card-actions>
        <v-dialog v-model="courseStore.showEditDialog3" max-width="2900px">
          <EditCourseDialog3 />
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
</style>
