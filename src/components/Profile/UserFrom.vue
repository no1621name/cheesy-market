<template>
  <Form class="user-form">
    <CCol :lg="6" class="pe-3">
      <fieldset id="fieldsetName" class="form__form-group">
        <CFormLabel class="form__label" for="nameInput">
          Имя и фамилия:
        </CFormLabel>
        <CFormInput
          id="nameInput"
          v-model.trim="userInfo.fullname"
          type="text"
          class="form__input"
          placeholder="Иван Иванов"
        />
      </fieldset>
    </CCol>
    <CCol :lg="6">
      <fieldset id="fieldsetPhone" class="form__form-group">
        <CFormLabel class="form__label" for="phoneInput">
          Телефон:
        </CFormLabel>
        <CFormInput
          id="phoneInput"
          v-model.trim="userInfo.phoneNumber"
          type="tel"
          class="form__input"
          placeholder="Введите номертелефона"
        />
      </fieldset>
    </CCol>
    <CCol :lg="6" class="pe-3">
      <fieldset id="fieldsetEmail" class="form__form-group">
        <CFormLabel class="form__label" for="emailInput">
          Email:
        </CFormLabel>
        <CFormInput
          id="emailInput"
          v-model.trim="userInfo.email"
          type="email"
          class="form__input"
          placeholder="Введите адресс электронной почты"
        />
      </fieldset>
    </CCol>
    <CCol :lg="6">
      <fieldset id="fieldsetPostcode" class="form__form-group">
        <CFormLabel class="form__label" for="postcodeInput">
          Почтовый индекс:
        </CFormLabel>
        <CFormInput
          id="postcodeInput"
          :model-value="String(userInfo.address.postcode)"
          type="number"
          class="form__input"
          min="1"
          placeholder="101000"
          @update:modelValue="(v: string) => userInfo.address.postcode = Number(v)"
        />
      </fieldset>
    </CCol>
    <CCol :lg="12">
      <fieldset id="fieldsetApartment" class="form__form-group">
        <CFormLabel class="form__label" for="apartmentInput">
          Адрес доставки:
        </CFormLabel>
        <CFormInput
          id="apartmentInput"
          v-model.trim="userInfo.address.apartment"
          type="text"
          class="form__input"
          placeholder="Улица, номер дома и номер квартиры"
        />
      </fieldset>
    </CCol>
    <CCol :lg="6" class="pe-3">
      <fieldset id="fieldsetCountry" class="form__form-group">
        <SelectLocation class="form__select" list-for="subject">
          <template #toggler>
            {{ userInfo.address.subject || 'Выберите область' }}
          </template>
        </SelectLocation>
      </fieldset>
    </CCol>
    <CCol :lg="6">
      <fieldset id="fieldsetCountry" class="form__form-group w-100">
        <SelectLocation
          :disabled="!userInfo.address.subject_id"
          :class="['form__select', `${!userInfo.address.subject_id ? 'disabled' : ''}`]"
          list-for="city"
        />
      </fieldset>
    </CCol>
  </Form>
</template>

<script lang="ts" setup>
import Form from '@/components/UI/Form.vue';
import SelectLocation from '@/components/UI/SelectLocation.vue';

import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);
</script>
