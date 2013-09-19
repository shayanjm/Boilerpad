describe('Sample application', function() {
  it('should display the home page', function() {
    browser().navigateTo('/');
    expect(element('title').text()).toBeDefined();
  });
});
