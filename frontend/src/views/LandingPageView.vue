<template>
    <div class="container">
        <div class="box mt-5 d-flex flex-column align-items-center text-center justify-content-center rounded bg-white">
            <div class="row align-items-center rounded-pill p-2">
                <div class="col">
                    <img src="/New Logo.png" class="img-fluid">
                </div>
                <div class="col">
                    <img src="/Stechoq.png" class="img-fluid">
                </div>
                <div class="col">
                    <img src="/Kampus Merdeka.png" class="img-fluid">
                </div>
            </div>
            <div class="btn-ctrl mt-5">
                <RouterLink to="/control">
                <button class="btn-control btn btn-primary">Control</button>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style>
.box{
    height: 300px;
}
.btn-control{
    width: 100px;
}
</style>