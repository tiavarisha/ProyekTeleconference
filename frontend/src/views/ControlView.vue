<template>
    <div class="container text-center">
        <div class="box-stream mt-5 bg-white rounded">
            <div class="row">
                <div class="col align-self-center py-4 ms-3">
                    <canvas id="channel1" class="bg-white border border-dark"></canvas>
                    <br>
                    <button type="button" class="btn btn-light btn-lg rounded-circle me-2 mt-3"><i class="bi-mic-fill"></i></button>
                    <button type="button" class="btn btn-light btn-lg rounded-circle ms-2 mt-3"><i class="bi-mic-mute-fill"></i></button>
                </div>
                <div class="col py-3">
                        <RouterLink to="/landingpage">
                        <button type="button" class="btn-kembali btn btn-danger mb-4">Kembali</button>
                        </RouterLink>
                    <div class="row">
                        <div class="arrows mt-4">
                            <button type="button" class="btn btn-primary btn-lg mb-2"><i class="bi-arrow-up"></i></button>
                            <br>
                            <button type="button" class="btn btn-primary btn-lg me-2"><i class="bi-arrow-left"></i></button>
                            <button type="button" class="btn btn-primary btn-lg ms-2"><i class="bi-arrow-right"></i></button>
                            <br>
                            <button type="button" class="btn btn-primary btn-lg mt-2"><i class="bi-arrow-down"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
canvas{
    width: 100%;
    height: auto;
}
.btn-kembali{
    width: 100px;
}
</style>

<script>
    import { loadPlayer } from 'rtsp-relay/browser';

    export default {
        mounted(){
            loadPlayer({
            url: 'ws://localhost:2000/api/stream',
            canvas: document.getElementById('channel1')
            });
        }
    }
</script>