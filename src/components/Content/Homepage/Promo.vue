<template>
  <section class="promo">
    <CRow class="promo__list">
      <CCol
        class="promo__item promo__item_big"
        lg="6"
        xs="12"
        :style="{backgroundImage: 'url(' + `${cloudinaryUrl}/pages/promo-1.png`+ ')'}"
      >
        <div class="promo__content">
          <h5 class="promo__heading">
            Наборы для сыроделия
          </h5>
          <p class="promo__description">
            Все что вам нужно для приготовления сыра
            в домашних условиях
          </p>
        </div>
        <NuxtLink class="promo__link" to="/sets">
          Смотреть наборы
        </NuxtLink>
      </CCol>
      <CCol
        class="promo__item"
        lg="3"
        xs="12"
        :style="{backgroundImage: 'url(' + `${cloudinaryUrl}/pages/promo-2.png`+ ')'}"
      >
        <NuxtLink class="promo__link" to="/recipes">
          <h6 class="promo__heading_sub">
            Рецепты
          </h6>
          <h5 class="promo__heading">
            Сыры с плесенью
          </h5>
        </NuxtLink>
      </CCol>
      <CCol
        class="promo__item"
        lg="3"
        xs="12"
        :style="{backgroundImage: 'url(' + `${cloudinaryUrl}/pages/promo-3.png`+ ')'}"
      >
        <NuxtLink class="promo__link" to="/">
          <h6 class="promo__heading_sub">
            Акции
          </h6>
          <h5 class="promo__heading">
            Закваски для сыра
          </h5>
        </NuxtLink>
      </CCol>
    </CRow>
  </section>
</template>

<script lang="ts" setup>
const cloudinaryUrl = useRuntimeConfig().public.cloudinaryUrl;
</script>

<style lang="scss" scoped>
.promo{
  margin-bottom: 40px;
  .promo__list{
    height: 300px;
    .promo__item{
      padding: 14px 22px;
      height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      .promo__link{
        text-decoration: none;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: flex-end;
        width: 100%;
        height: 100%;
      }
      .promo__heading{
        @include Heading2();
        font-size: 1.375rem;
        line-height: 1.75rem;
        color: $white;
      }
      .promo__heading_sub{
        @include CirceRounded16();
        color: $orange;
      }
      &.promo__item_big{
        padding: 30px 30px;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: space-between;
        .promo__heading{
          font-size: 2.25rem;
          line-height: 2.5rem;
        }
        .promo__description{
          max-width: 400px;
          @include CirceRounded16();
          font-size: 1.125rem;
          line-height: 1.625rem;
          color: $white;
        }
        .promo__link{
          @include CirceRounded16();
          width: auto;
          height: auto;
          display: inline;
          padding: 11px 30px;
          background: $orange;
          color: $white;
          border-radius: 5px;
        }
      }
    }
  }
}
@media (max-width: 991px) {
  .promo .promo__list{
    height: max-content;
    .promo__item{
      height: 120px;
      .promo__heading{
        font-size: 1.5rem !important;
      }
      &.promo__item_big{
        height: max-content;
        .promo__description{
          font-size: 1rem;
        }
      }
    }
  }
}
</style>
