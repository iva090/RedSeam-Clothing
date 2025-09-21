<script>
    import {api} from "$lib/axios/axios.js"
    async function getData() {
        const response = await api.get("/products")
    }
</script>