<template>
    <v-container>
        <v-row>
            <v-col cols="4">
                <v-card style="margin-left: 10%;margin-top: 15%;">
                    <v-img height="15vh" src="https://img.freepik.com/free-vector/realist-illustration-room-interior_52683-64752.jpg?w=1060&t=st=1714843452~exp=1714844052~hmac=e767aadc96b291547ce66a82185eb5e078cac3c31f6ca29c677e54174e142dbb" cover > 
                    <v-toolbar color="transparent">
                            <template v-slot:append>
                                <v-btn icon="mdi-dots-vertical" color="white"></v-btn>
                            </template>
                            <v-card-title style="margin-top: 5%;">
                        <h1 class="text-white">Course List</h1>
                    </v-card-title>
                        </v-toolbar>
                    </v-img>
                    <v-avatar size="100" style="position: absolute; top: 50%; right: 0%; transform: translate(-50%, -50%);">
                        <v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
                    </v-avatar>
                        <v-card-text>
                            <div class="text-h6 mb-1">กลุ่มเรียนที่</div>
                            <div class="text-h6 mb-1">อาจารย์</div>
                            <div class="text-h6 mb-1">เวลาเรียน</div>
                        </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>