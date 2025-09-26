<script>
    import { userEmail } from '$lib/auth.js';
    import { api } from '$lib/axios/axios.js';
    import { onMount } from 'svelte';

    import OrderDetailsForm from '$lib/components/OrderDetailsForm.svelte';
    import OrderSummary from '$lib/components/OrderSummary.svelte';
    import SuccessModal from '$lib/components/SuccessModal.svelte';

    export let getCartItems;
    let cartItems = null;
    let notificationMessage = '';
    let isModalOpen = false;
    let initialEmail = $userEmail

    const deliveryFee = 5;
    $: subtotal = cartItems
        ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        : 0;
    $: total = subtotal + deliveryFee;

    let formData = {
        name: '',
        surname: '',
        email: initialEmail,
        zip_code: '',
        address: '',
    };
    $: formData.email = $userEmail || '';

    let errors = {
        name: '',
        surname: '',
        email: '',
        zip_code: '',
        address: '',
    };

    function showNotification(message, duration = 3000) {
        notificationMessage = message;
        setTimeout(() => {
            notificationMessage = '';
        }, duration);
    }

    getCartItems = async () => {
        try {
            const response = await api.get('/cart');
            if (response.status === 200) {
                cartItems = response.data;
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    async function updateCartItem(item, newQuantity) {
        if (newQuantity < 1) return;

        item.quantity = newQuantity;
        cartItems = [...cartItems];

        try {
            await api.patch(`/cart/products/${item.id}`, {
                quantity: newQuantity,
                color: item.color,
                size: item.size
            });
        } catch (error) {
            console.error('Error updating item quantity:', error);
            getCartItems();
        }
    }

    async function deleteCartItem(item) {
        if (cartItems && cartItems.length <= 1) {
            showNotification('You must keep at least one item in the cart.', 4000);
            return;
        }

        try {
            await api.delete(`/cart/products/${item.id}`, {
                data: {
                    color: item.color,
                    size: item.size
                }
            });

            cartItems = cartItems.filter(
                (cartItem) =>
                    !(cartItem.id === item.id && cartItem.color === item.color && cartItem.size === item.size)
            );
        } catch (error) {
            console.error('Error deleting item:', error);
            getCartItems();
        }
    }

    function validateForm() {
        let isValid = true;
        let newErrors = { name: '', surname: '', email: '', address: '', zip_code: '' };

        const isRequired = (value, fieldName) => {
            if (!value.trim()) {
                newErrors[fieldName] =
                    `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required.`;
                isValid = false;
            }
        };

        isRequired(formData.name, 'name');
        isRequired(formData.surname, 'surname');
        isRequired(formData.address, 'address');

        isRequired(formData.email, 'email');
        if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format.';
            isValid = false;
        }

        isRequired(formData.zip_code, 'zip');
        if (formData.zip_code.trim() && !/^\d{5,10}$/.test(formData.zip_code)) {
            newErrors.zip_code = 'Zip code must be 5 to 10 digits.';
            isValid = false;
        }

        errors = newErrors;
        return isValid;
    }

    async function handleSubmit() {
        if (validateForm()) {
            try{
                const response = await api.postForm('/cart/checkout', formData);
                if (response.status === 200){
                    console.log('Checkout successful:', response.data);
                    isModalOpen = true; 
                    cartItems = []; 
                    formData = { name: '', surname: '', email: $userEmail || '', address: '', zip_code: '' };
                    errors = { name: '', surname: '', email: '', address: '', zip_code: '' };
                }
            } catch(error) {
                console.error('Checkout failed:', error);
                showNotification('Checkout failed. Please try again.', 4000);
            }
        } else {
            showNotification('Please correct the errors in the order details.', 4000);
        }
    }

    onMount(() => {
        getCartItems();
    });
</script>

{#if notificationMessage}
    <div
        class="fixed top-0 left-1/2 z-50 mt-4 -translate-x-1/2 rounded-lg bg-yellow-100 p-4 text-yellow-800 shadow-xl"
    >
        {notificationMessage}
    </div>
{/if}

<SuccessModal bind:open={isModalOpen} on:close={() => isModalOpen = false} />

<div class="p-24 py-1">
    <h1 class="mb-10 text-4xl font-semibold">Checkout</h1>

    <div class="grid-rows 2 grid h-[75vh] grid-cols-3 items-start gap-35">
        <div class="col-span-2 grid h-full grid-cols-2 rounded-2xl bg-[#f8f6f7] p-10 shadow-sm">
            <OrderDetailsForm
                bind:formData
                bind:errors
                {handleSubmit}  
            />
        </div>

        <OrderSummary
            {cartItems}
            {subtotal}
            {total}
            {deliveryFee}
            {updateCartItem}
            {deleteCartItem}
            {handleSubmit}
        />
    </div>
</div>