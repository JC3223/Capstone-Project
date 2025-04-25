<template>
  <NavBar></NavBar>
  <Introduction></Introduction>
  <ThreeReason></ThreeReason>
  <FeatureCarousel></FeatureCarousel>
  <TimeLine></TimeLine>
  <QuickStart></QuickStart>
  <div class="center-content">
    <section data-ref="faq" class="section">
      <h1>Got any questions?</h1>
      <FaqComponent :faqItems="faqItems" />
    </section>
  </div>
  <Footer></Footer>
</template>

<script setup>
import NavBar from "@/components/CommonComponents/NavigationBar.vue";
import Footer from "@/components/CommonComponents/Footer.vue";
import Introduction from "@/components/LandingPageComponents/Old/IntroductionSection.vue";
import ThreeReason from "@/components/LandingPageComponents/Old/ThreeReasonSection.vue";
import FeatureCarousel from "@/components/LandingPageComponents/Old/FeatureCarousel.vue";
import TimeLine from "@/components/LandingPageComponents/Old/TimeLine.vue";
import QuickStart from "@/components/LandingPageComponents/Old/QuickStart.vue";

const faqItems = ref([
  {
    question: "What is QuoteMate?",
    answer:
      "QuoteMate is an AI-powered platform that generates instant, free quotations for various home services. It eliminates the need for in-person assessments, saving you time and providing transparent pricing.",
    isOpen: false,
  },
  {
    question: "How accurate are the quotes?",
    answer:
      "QuoteMate's AI is trained on a large dataset of real-world project costs and market trends, ensuring accurate and reliable estimates. However, final costs may vary depending on specific project details and unforeseen circumstances.",
    isOpen: false,
  },
  {
    question: "How do I get a quote?",
    answer:
      "Simply enter chat with your QuoteMate and our AI will analyze your information and generate an instant quotation that best suits what you are looking for.",
    isOpen: false,
  },
  {
    question: "What information do I need to provide to get a quote?",
    answer:
      "The required information varies depending on the service. Generally, you'll need to provide details about the scope of the project, what issues you are facing, and any specific requirements.",
    isOpen: false,
  },
]);
</script>

<style scoped>
.center-content {
  padding-top: 20px;
  text-align: center;
}
</style>
