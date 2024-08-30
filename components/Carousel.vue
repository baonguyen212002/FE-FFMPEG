<template>
  <Carousel>
    <CarouselItem>
      <img src="https://flowbite.com/docs/images/carousel/carousel-1.jpg" alt="..." />
    </CarouselItem>
    <CarouselItem>
      <img src="https://flowbite.com/docs/images/carousel/carousel-2.jpg" alt="..." />
    </CarouselItem>
    <CarouselItem>
      <img src="https://flowbite.com/docs/images/carousel/carousel-3.jpg" alt="..." />
    </CarouselItem>
  </Carousel>
</template>

<script>
import { Carousel, CarouselItem } from 'flowbite'

export default {
  components: {
    Carousel,
    CarouselItem
  }
}
</script>
