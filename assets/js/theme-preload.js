(function () {
      try {
        if (window.localStorage.getItem('lb-theme') === 'dark') {
          document.documentElement.classList.add('theme-dark');
        }
      } catch (error) {
        // Storage unavailable.
      }
    })();

