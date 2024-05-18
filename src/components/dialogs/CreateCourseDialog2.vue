<script lang="ts" setup>
import { useCourseStore } from "@/stores/course.store";
import { ref, watch } from "vue";
import CreateCourseDialog3 from "./CreateCourseDialog3.vue";
const courseStore = useCourseStore();
const selectedDate = ref(new Date());
const showDatePicker = ref(false);
const selectedTime = ref("00:00");
const showTimePicker = ref(false);
const selectedDate2 = ref(new Date());
const showDatePicker2 = ref(false);
const selectedTime2 = ref("00:00");
const showTimePicker2 = ref(false);

function formatThaiDate(date: Date) {
  return date
    .toLocaleDateString("th-TH", {
      weekday: "long", // Full weekday name
    })
    .replace(".", "");
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
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-card style="width: 30vw">
        <v-card-title style="margin-left: 3%; margin-top: 1%">
          <h2>รายละเอียดห้องเรียน</h2>
        </v-card-title>
        <v-card variant="outlined" class="textarea" style="width: 27vw">
          <v-card-title>
            <h3 style="margin-bottom: 2%">สร้างรายละเอียดวิชา</h3>
            <v-row style="height: 8vh">
              <v-col cols="3">
                <p>กลุ่มเรียนที่</p>
              </v-col>
              <v-col align="left" class="fields">
                <v-text-field variant="outlined"></v-text-field>
              </v-col>
              <v-col>
                <p>คะแนนเต็ม</p>
              </v-col>
              <v-col align="left" class="fields">
                <v-text-field variant="outlined"></v-text-field>
              </v-col>
            </v-row>
            <v-row style="height: 8vh">
              <v-col cols="3">
                <p>จำนวนหน่วยกิต</p>
              </v-col>
              <v-col align="left" class="fields">
                <v-text-field variant="outlined"></v-text-field>
              </v-col>
              <v-col>
                <p>จำนวนนักเรียน</p>
              </v-col>
              <v-col align="left" class="fields">
                <v-text-field variant="outlined"></v-text-field>
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
                    <v-text-field v-model="selectedTime" variant="outlined" readonly>
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
                    <v-text-field v-model="selectedTime2" variant="outlined" readonly>
                      <template v-slot:append>
                        <v-icon v-bind="props">mdi-clock-outline</v-icon>
                      </template>
                    </v-text-field>
                  </template>
                  <v-time-picker v-model="selectedTime2" format="24hr"></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row style="height: 8vh; margin-bottom: 2%">
              <v-col cols="3">
                <p>รหัสวิชา</p>
              </v-col>
              <v-col align="left" class="fields">
                <v-text-field variant="outlined"></v-text-field>
              </v-col>
            </v-row>
          </v-card-title>
        </v-card>
        <v-card-actions class="actions">
          <v-btn @click="courseStore.closeDialog">ยกเลิก</v-btn>
          <v-btn @click="courseStore.showCreateDialog3 = true" class="colorText"
            >ต่อไป
          </v-btn>
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
