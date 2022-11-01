<template>
  <nav class="nav">
    <template v-if="!isMobile">
      <CDropdown class="nav__item">
        <CDropdownToggle @click.once="getRecipesCategories">
          Рецепты <DropdownArrow1Svg />
        </CDropdownToggle>
        <CDropdownMenu>
          <template v-if="recipesCategories.length">
            <CDropdownItem
              v-for="category in recipesCategories"
              :key="category._id"
              href="#"
            >
              <!-- TODO: add link -->
              <ClientOnly>
                <NuxtLink :to="`/recipes/categories/${category._id}`" class="nav__link">
                  {{ category.name }}
                </NuxtLink>
              </ClientOnly>
            </CDropdownItem>
          </template>
          <CDropdownItem v-else>
            Загрузка...
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
      <NuxtLink to="/reviews" class="nav__item nav__link">
        Отзывы
      </NuxtLink>
      <NuxtLink to="/products/brands" class="nav__item nav__link">
        Производители
      </NuxtLink>
      <NuxtLink to="/sets" class="nav__item nav__link">
        Наборы для сыроделия
      </NuxtLink>
      <NuxtLink to="/blogs" class="nav__item nav__link">
        Блог
      </NuxtLink>
      <NuxtLink to="/contacts" class="nav__item nav__link">
        Контакты
      </NuxtLink>
    </template>
    <template v-else>
      <header class="nav__header">
        <Advantages :highlighted="true" />
      </header>
      <!-- TODO: menu -->
      <!--
      <CButton class="nav__item">
        Ингредиенты <DropdownArrow2Svg />
      </CButton>
      <CButton class="nav__item">
        Ингредиенты <DropdownArrow2Svg />
      </CButton>
       -->
      <CButton class="nav__item">
        Рецепты <DropdownArrow2Svg />
      </CButton>
      <NuxtLink to="/" class="nav__item nav__link">
        Отзывы
      </NuxtLink>
      <NuxtLink to="/" class="nav__item nav__link">
        Вопросы и ответы
      </NuxtLink>
      <NuxtLink to="/" class="nav__item nav__link">
        Контакты
      </NuxtLink>
      <NuxtLink to="/sets">
        Наборы
      </NuxtLink>
      <footer class="nav__footer">
        <SocialMedias />
      </footer>
    </template>
  </nav>
</template>

<script lang="ts" setup>
import DropdownArrow1Svg from '@/assets/images/icons/dropdown-arrow-1.svg?component';
import DropdownArrow2Svg from '@/assets/images/icons/dropdown-arrow-2.svg?component';

import SocialMedias from '@/components/Content/Header/SocialMedias.vue';
import Advantages from '@/components/Content/Header/Advantages.vue';

const { isMobile } = useGetWidowWidth();

const recipesCategories = ref<RecipeCategory[]>([]);

const getRecipesCategories = async () => {
  const response = await useApiAsyncData<ServerResponseI<'categories', RecipeCategory[]>>('navRecipesCategories', '/recipes/categories');

  recipesCategories.value = useValidateResponse(response)?.data.categories || [];
};

</script>

<style lang="scss" scoped>
.nav{
  display: flex;
  align-items: center;
  .nav__item{
    &:not(:last-child){
      margin-right: 20px;
    }
    .dropdown-toggle{
      padding: 0;
    }
    .dropdown-menu .dropdown-item > *{
      font-size: .875rem;
      &:active{
        color: $white;
      }
    }
    > * {
      @include Roboto14();
    }
  }
  .nav__link{
    @include Link();
  }
}

@media (max-width: 767px) {
  .nav{
    flex-direction: column;
    width: 100vw;
    .nav__header{
      margin-bottom: 10px;
    }
    .nav__item{
      font-size: .875rem;
      align-items: center;
      display: flex;
      justify-content: space-between;
      width: 100%;
      text-align: left;
      margin-right: 0 !important;
      border-radius: 0;
      border-bottom: 1px solid rgba($color: $darkGrey, $alpha: .5) !important;
      padding: 10px;
      &:focus{
        text-decoration: none;
      }
    }
    .nav__footer{
      margin-top: 20px;
    }
  }

}
</style>
