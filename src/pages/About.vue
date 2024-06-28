<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const downloadStatus = ref<'idle' | 'success' | 'error'>('idle');

// JSONデータ
const jsonData = [
  {
    "album": "The White Stripes",
    "year": "1999",
    "US_peak_chart_post": "-"
  },
  {
    "album": "De Stijl",
    "year": "2000",
    "US_peak_chart_post": "-"
  },
  {
    "album": "White Blood Cells",
    "year": "20.01",
    "US_peak_chart_post": "61"
  },
  {
    "album": "Elephant",
    "year": "2003",
    "US_peak_chart_post": "6"
  },
  {
    "album": "Get Behind Me Satan",
    "year": "2005",
    "US_peak_chart_post": "3"
  },
  {
    "album": "Icky Thump",
    "year": "2007",
    "US_peak_chart_post": "2"
  },
  {
    "album": "Under Great White Northern Lights",
    "year": "2010",
    "US_peak_chart_post": "11"
  },
  {
    "album": "Live in Mississippi",
    "year": "2011",
    "US_peak_chart_post": "-"
  },
  {
    "album": "Live at the Gold Dollar",
    "year": "2012",
    "US_peak_chart_post": "-"
  },
  {
    "album": "Nine Miles from the White City",
    "year": "2013",
    "US_peak_chart_post": "-"
  }
];

// JSONをCSVに変換する関数
const convertToCSV = (data: any[]): string => {
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','), // ヘッダー行
    ...data.map(row => headers.map(fieldName => JSON.stringify(row[fieldName])).join(','))
  ];
  return csvRows.join('\n');
};

// CSVファイルをダウンロードする関数
const downloadCSV = () => {
  try {
    const csv = convertToCSV(jsonData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'white_stripes_albums.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    downloadStatus.value = 'success';

    // ダウンロード完了後、3秒後にリダイレクト
    setTimeout(() => {
      router.push('/');
    }, 3000);
  } catch (error) {
    console.error('Download failed:', error);
    downloadStatus.value = 'error';
  }
};
</script>

<template>
  <h1>About</h1>
  <div>
    <h2>The White Stripes Albums</h2>
    <button @click="downloadCSV">Download CSV</button>
    <p v-if="downloadStatus === 'success'">ダウンロードが完了しました。まもなくリダイレクトします。</p>
    <p v-else-if="downloadStatus === 'error'">ダウンロードに失敗しました。再度お試しください。</p>
  </div>
</template>

<style scoped>

</style>
