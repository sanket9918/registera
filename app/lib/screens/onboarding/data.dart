class OnboardingContents {
  final String title;
  final String image;
  final String desc;

  OnboardingContents(
      {required this.title, required this.image, required this.desc});
}

List<OnboardingContents> contents = [
  OnboardingContents(
    title: "Track the registration with ease",
    image: "assets/images/image1.png",
    desc: "Remember to keep track of your participants.",
  ),
  OnboardingContents(
    title: "Stay organized with team",
    image: "assets/images/image2.png",
    desc: "Never lose any potential participant.",
  ),
  OnboardingContents(
    title: "Get notified when work happens",
    image: "assets/images/image3.png",
    desc:
        "Take control of notifications, collaborate live or on your own time.",
  ),
];
