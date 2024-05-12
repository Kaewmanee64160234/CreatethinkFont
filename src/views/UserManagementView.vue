<script setup lang="ts">
import CreateUserDialog from '@/components/dialogs/CreateUserDialog.vue';
import EditUserDialog from '@/components/dialogs/EditUserDialog.vue';
import { User } from '@/stores/types/User';
import { useUserStore } from '@/stores/user.store';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();

onMounted(async () => {
  await userStore.getUsers();
})

const showEditDialog = (user: User) => {
  userStore.showEditDialog = true;
  userStore.editUser = { ...user, files: [] };
  console.log('id user', userStore.editUser);
}

// function delete user
const deleteUser = async (id: number) => {
  console.log(id);
  await userStore.deleteUser(id);
}
const showDeleteDialog = (user: User) => {
  userStore.showDeleteDialog = true;
  userStore.currentUser = user;
}
const tab = ref(0);

// const students = ref<Student[]>([
//   { id: '64160047', name: 'นาย สมชาย ใจดีมาก', position: 'นิสิต', status: 'กำลังศึกษาอยู่', photoUrl: 'path/to/image1.jpg' },
//   { id: '64160048', name: 'นางสาว สมหญิง สุขใจ', position: 'นิสิต', status: 'กำลังศึกษาอยู่', photoUrl: 'path/to/image2.jpg' },
//   // More students can be added here
// ]);
</script>
<template>
  <v-container style="padding-top: 120px;">
    <v-toolbar style="background-color: white;" flat>
      <v-toolbar-title class="mr-10" style="font-weight: bold;">การจัดการผู้ใช้งาน</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-row align="center" justify="space-between">
        <v-col cols="10" md="8">
          <v-text-field label="ค้นหารหัส" height="20px" hide-details="auto" density="compact" variant="solo"
            v-model="userStore.keyword" append-inner-icon="mdi-magnify"
            @click:append-inner="userStore.getUserBystidId"></v-text-field>
        </v-col>
        <v-col cols="2" md="4">
          <v-btn color="primary" variant="elevated" @click="userStore.showDialog = true">
            <v-icon left>mdi-plus</v-icon>
            เพิ่มผู้ใช้
            <v-dialog v-model="userStore.showDialog" persistent>
              <CreateUserDialog></CreateUserDialog>
            </v-dialog>
          </v-btn>
        </v-col>
      </v-row>
    </v-toolbar><br>
    <v-card class="my-3 emboss-effect" style="width: 100%;" elevation="2">
      <v-tabs v-model="tab" background-color="white" dark>
        <v-tab>นิสิต</v-tab>
        <v-tab>อาจารย์</v-tab>
        <v-tab>บุคลากร</v-tab>
      </v-tabs>
      <!-- Tab content for นืสิต -->
      <v-tab-item v-if="tab === 0">
        <v-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left"></th>
                <th class="text-left">ภาพ</th>
                <th class="text-left">รหัสนิสิต</th>
                <th class="text-left">ชื่อ-นามสกุล</th>
                <th class="text-left">ตำแหน่ง</th>
                <th class="text-left">สถานะภาพ</th>
                <th class="text-center">ตัวเลือกเพิ่มเติม</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) of userStore.users" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.imageProfile }}</td>
                <td>{{ item.studentId }}</td>
                <td>{{ item.firstName + " " + item.lastName }}</td>
                <td>{{ item.role }}</td>
                <td style="color: seagreen;">{{ item.status }}</td>
                <td class="d-flex justify-center">
                  <v-btn small class="ma-1" color="yellow darken-2" text="Button Text" @click="showEditDialog(item)">
                    <v-icon left>mdi-pencil</v-icon>
                    แก้ไขข้อมูล
                  </v-btn>
                  <v-btn small class="ma-1" color="red" text="Button Text" @click="deleteUser(item.userId!)">
                    <v-icon left>mdi-delete</v-icon>
                    ลบข้อมูล
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-table>
      </v-tab-item>
      <!-- Tab content for อาจารย์ -->
      <v-tab-item v-if="tab === 1">
        <!-- Content for อาจารย์ -->
      </v-tab-item>

      <!-- Tab content for บุคลากร -->
      <v-tab-item v-if="tab === 2">
        <!-- Content for บุคลากร -->
      </v-tab-item>
    </v-card>
  </v-container>
  <v-dialog v-model="userStore.showEditDialog" persistent>
    <EditUserDialog></EditUserDialog>
  </v-dialog>

</template>
<style scoped>
.v-data-table .v-icon {
  cursor: pointer;
}

.emboss-effect {
  background: #fff;
  /* Ensure the card background is light to enhance the shadow effect */
  box-shadow: inset 0px 0px 8px rgba(0, 0, 0, 0.2);
  /* Inset shadow for embossed effect */
}
</style>