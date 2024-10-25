<template>
  <section class="JobsSection" id="jobs" ref="revealContainer">
    <h2 class="numbered-heading">{{ $t('lang.whereIveWorked') }}</h2>

    <div class="inner">
      <div role="tablist" aria-label="Job tabs" @keydown="onKeyDown" class="tab-list">
        <button v-for="(job, index) in jobsData" :key="index" :class="['tab-button', { active: activeTabId === index }]"
          @click="setActiveTabId(index)" :id="`tab-${index}`" role="tab" :tabIndex="activeTabId === index ? '0' : '-1'"
          :aria-selected="activeTabId === index" :aria-controls="`panel-${index}`">
          {{ job.company }}
        </button>
        <div class="highlight" :style="{ transform: `translateY(${activeTabId * 40}px)` }"></div>
      </div>

      <div class="tab-panels">
        <div v-for="(job, index) in jobsData" :key="index" :id="`panel-${index}`" role="tabpanel"
          :tabIndex="activeTabId === index ? '0' : '-1'" :aria-labelledby="`tab-${index}`"
          :aria-hidden="activeTabId !== index" class="tab-panel" v-show="activeTabId === index">
          <h3>
            <span>{{ job.title }}</span>
            <span class="company">
              <a :href="job.url" class="inline-link">&nbsp;@{{ job.company }}</a>
            </span>
          </h3>
          <p class="range">{{ $t('lang.range') }}: {{ job.range }}</p>
          <ContentRendererMarkdown :value="job" v-if="job" />
          <!-- <div v-html="renderHtml(job.body.children)"></div> -->
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>


const { locale } = useI18n();

const activeTabId = ref(0)
const jobsData = ref([]);


// Function to fetch job data based on the current locale
const fetchJobsData = async () => {
  const dataJobs = await queryContent(`/${locale.value}/jobs`).find();
  jobsData.value = dataJobs; // Update the jobs data
};

onMounted(async () => {
  await fetchJobsData();
});



function setActiveTabId(index) {
  activeTabId.value = index
}

function onKeyDown(event) {
  // Navigation logic here, if required
}

/* function renderHtml(node) {

  if (!node || node.length === 0) {
    console.error("renderHtml node passed is null");
    return '';
  }

  return node.map(n => {

    if (n.type === 'text') {
      return n.value;
    }

    if (n.type === 'element') {
      const childrenHtml = this.renderHtml(n.children || []);
      return `<${n.tag}>${childrenHtml}</${n.tag}>`;
    }

    return '';

  }).join('');
} */
</script>


<style lang="scss" scoped>
.JobsSection {
  max-width: 700px;

  .inner {
    display: flex;

    @media (max-width: 600px) {
      display: block;
    }

    // Prevent container from jumping
    @media (min-width: 700px) {
      min-height: 340px;
    }
  }

  .tab-list {
    position: relative;
    z-index: 3;
    width: max-content;
    padding: 0;
    margin: 0;
    list-style: none;

    @media (max-width: 600px) {
      display: flex;
      overflow: auto;
      width: calc(100% + 100px);
      padding-left: 50px;
      margin-left: -50px;
      margin-bottom: 30px;
    }

    @media (max-width: 480px) {
      width: calc(100% + 50px);
      padding-left: 25px;
      margin-left: -25px;
    }

    li {
      &:first-of-type {
        @media (max-width: 600px) {
          margin-left: 50px;
        }

        @media (max-width: 480px) {
          margin-left: 25px;
        }
      }

      &:last-of-type {
        @media (max-width: 600px) {
          padding-right: 50px;
        }

        @media (max-width: 480px) {
          padding-right: 25px;
        }
      }
    }
  }

  .tab-button {
    display: flex;
    align-items: center;
    width: 100%;
    height: $tab-height;
    padding: 0 20px 2px;
    border-left: 2px solid $lightest-navy;
    background-color: transparent;
    color: $slate;
    font-family: $font-mono;
    font-size: $fz-xs;
    text-align: left;
    white-space: nowrap;

    &.active {
      color: $gold;
    }

    @media (max-width: 768px) {
      padding: 0 15px 2px;
    }

    @media (max-width: 600px) {
      display: flex;
      justify-content: center;
      min-width: 120px;
      padding: 0 15px;
      border-left: 0;
      border-bottom: 2px solid $lightest-navy;
      text-align: center;
    }

    &:hover,
    &:focus {
      background-color: $light-navy;
    }
  }

  .highlight {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 2px;
    height: $tab-height;
    border-radius: $border-radius;
    background: $gold;
    transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition-delay: 0.1s;

    @media (max-width: 600px) {
      top: auto;
      bottom: 0;
      width: 100%;
      max-width: $tab-width;
      height: 2px;
      margin-left: 50px;
      transform: translateX(calc(1 * $tab-width));
    }

    @media (max-width: 480px) {
      margin-left: 25px;
    }
  }

  .tab-panels {
    position: relative;
    width: 100%;
    margin-left: 20px;

    @media (max-width: 600px) {
      margin-left: 0;
    }
  }

  .tab-panel {
    width: 100%;
    height: auto;
    padding: 10px 5px;



    h3 {
      margin-bottom: 2px;
      font-size: $fz-xxl;
      font-weight: 500;
      line-height: 1.3;

      .company {
        color: $gold;
      }
    }

    :deep(ul) {
      @include fancyList;
    }

    .range {
      margin-bottom: 25px;
      color: $light-slate;
      font-family: $font-mono;
      font-size: $fz-xs;
    }
  }
}
</style>