<template>
    <div id="container">
        <h2>{{initData}}</h2>
    </div>
</template>
<script>

export default ({
    data(){
       return {
           initData:'hello lewis this is you first vue'
       }
    }
})
</script>

<style lang="scss">
#container{
    color: red;
}
</style>
