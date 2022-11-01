<template>
  <CDropdown>
    <CDropdownToggle @click="() => getList()">
      <slot name="toggler">
        <ClientOnly>
          {{ userInfo.address[listFor] || 'Выберите город' }}
          <template #placeholder>
            Выберите город
          </template>
        </ClientOnly>
      </slot>
    </CDropdownToggle>
    <CDropdownMenu>
      <template v-if="list.length">
        <CDropdownItem
          v-for="loc in list"
          :key="loc._id"
          href="#"
          @click="() => {
            userInfo.address[listFor] = loc.name;
            userInfo.address[`${listFor}_id`] = loc._id;
          }"
        >
          {{ loc.name }}
        </CDropdownItem>
      </template>
      <template v-else>
        <CDropdownItem>
          Загрузка...
        </CDropdownItem>
      </template>
    </CDropdownMenu>
  </CDropdown>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
const userStore = useUserStore();

const { userInfo } = storeToRefs(userStore);

const props = defineProps<{ listFor: keyof Pick<User['address'], 'subject' | 'city'>}>();
const { listFor } = toRefs(props);
const listName = listFor.value === 'subject' ? 'subjects' : 'cities';

const list = ref<City[] | Subject[]>([]);

const getList = async () => {
  await $fetchApi<ServerResponseI<typeof listName, City[] | Subject[]>>(`/${listName}`, {
    query: listFor.value === 'city'
      ? {
          subject: userInfo.value.address.subject_id,
        }
      : {},
    async onResponse({ response }) {
      list.value = response._data.data[listName];
    }
  });
};
</script>
