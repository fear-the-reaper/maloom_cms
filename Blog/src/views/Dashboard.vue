<template>
    <section class="d-flex justify-content-around">
        <!-- FORM TO CREATE POSTS -->
        <section class="my-5">
            <!-- <h2 class="text-info">FORM WILL BE HERE</h2> -->
            <div class="bg-black my-5 p-3 text-center "> 
                <router-link class="text-white" to="/dashboard/add">ADD A POST</router-link>
            </div>
            <div class="bg-primary my-5 p-3 text-center"> 
                <router-link class="text-white" to="/dashboard/edit">EDIT A POST</router-link>
            </div>
            <div class="bg-danger my-5 p-3 text-center">
                <router-link class="text-white" to="/dashboard/delete">DELETE A POST</router-link>
            </div>
            <router-view key="showDashboard"></router-view>
        </section>
    </section>
</template>

<script>
export default {
    name: "Dashboard"
}
</script>

<style>
.bg-black {
    background-color: black!important;
}
</style>