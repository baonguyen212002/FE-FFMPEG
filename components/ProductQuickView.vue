<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-10" @close="close">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enter-to="opacity-100 translate-y-0 md:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 md:scale-100"
            leave-to="opacity-0 translate-y-4 md:translate-y-0 md:scale-95">
            <DialogPanel
              class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
              <div
                class="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                <button type="button"
                  class="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                  @click="close">
                  <span class="sr-only">Close</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>

                <div class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                  <div class="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                    <img :src="product?.imageSrc" :alt="product?.imageAlt" class="object-cover object-center" />
                  </div>
                  <div class="sm:col-span-8 lg:col-span-7">
                    <h2 class="text-2xl font-bold text-gray-900 sm:pr-12">{{ product?.name }}</h2>

                    <section aria-labelledby="information-heading" class="mt-2">
                      <h3 id="information-heading" class="sr-only">Product information</h3>

                      <p class="text-2xl text-gray-900">{{ product?.price }}</p>

                      <!-- Reviews -->
                      <div class="mt-6">
                        <h4 class="sr-only">Reviews</h4>
                        <div class="flex items-center">
                          <div class="flex items-center">
                            <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating"
                              :class="[product?.rating > rating ? 'text-gray-900' : 'text-gray-200', 'h-5 w-5 flex-shrink-0']"
                              aria-hidden="true" />
                          </div>
                          <p class="sr-only">{{ product?.rating }} out of 5 stars</p>
                          <a href="#" class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">{{
                            product?.reviewCount }} reviews</a>
                        </div>
                      </div>
                    </section>

                    <section aria-labelledby="options-heading" class="mt-10">
                      <h3 id="options-heading" class="sr-only">Product options</h3>

                      <form>
                        <!-- Colors -->
                        <fieldset aria-label="Choose a color">
                          <legend class="text-sm font-medium text-gray-900">Color</legend>

                          <RadioGroup v-model="selectedColor" class="mt-4 flex items-center space-x-3">
                            <RadioGroupOption as="template" v-for="color in product?.colors || []" :key="color.name"
                              :value="color" :aria-label="color.name" v-slot="{ active, checked }">
                              <div
                                :class="[color.selectedClass, active && checked ? 'ring ring-offset-1' : '', !active && checked ? 'ring-2' : '', 'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none']">
                                <span aria-hidden="true"
                                  :class="[color.class, 'h-8 w-8 rounded-full border border-black border-opacity-10']" />
                              </div>
                            </RadioGroupOption>
                          </RadioGroup>
                        </fieldset>

                        <!-- Sizes -->
                        <fieldset class="mt-10" aria-label="Choose a size">
                          <div class="flex items-center justify-between">
                            <div class="text-sm font-medium text-gray-900">Size</div>
                            <a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">Size guide</a>
                          </div>

                          <RadioGroup v-model="selectedSize" class="mt-4 grid grid-cols-4 gap-4">
                            <RadioGroupOption as="template" v-for="size in product?.sizes || []" :key="size.name"
                              :value="size" :disabled="!size.inStock" v-slot="{ active, checked }">
                              <div
                                :class="[size.inStock ? 'cursor-pointer bg-white text-gray-900 shadow-sm' : 'cursor-not-allowed bg-gray-50 text-gray-200', active ? 'ring-2 ring-indigo-500' : '', checked ? 'ring-2 ring-indigo-500' : '', 'group relative flex items-center justify-center rounded-md border py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1']">
                                <RadioGroup.Label as="span">{{ size.name }}</RadioGroup.Label>
                                <span v-if="size.inStock" class="pointer-events-none absolute -inset-px rounded-md"
                                  aria-hidden="true"
                                  :class="[active ? 'border' : 'border-2', checked ? 'border-indigo-500' : 'border-transparent']" />
                              </div>
                            </RadioGroupOption>
                          </RadioGroup>
                        </fieldset>

                        <button type="submit"
                          class="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Add
                          to bag</button>
                      </form>
                    </section>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { Dialog, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon, StarIcon } from '@heroicons/vue/20/solid'
import { RadioGroup, RadioGroupOption } from '@headlessui/vue'
import { ref, watch } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  product: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['close'])

const selectedColor = ref(null)
const selectedSize = ref(null)

watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      selectedColor.value = newProduct.colors?.[0] || null
      selectedSize.value = newProduct.sizes?.[0] || null
    }
  },
  { immediate: true }
)

const close = () => {
  emit('close')
}
</script>
