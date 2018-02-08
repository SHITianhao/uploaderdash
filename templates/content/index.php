<?php
// script('uploaderdash', 'lib/react.development');
// script('uploaderdash', 'lib/react-dom.development');

script('uploaderdash', 'lib/react.production.min');
script('uploaderdash', 'lib/react-dom.production.min');
script('uploaderdash', 'dist/vendor.bundle');

script('uploaderdash', 'dist/main');

style('uploaderdash', 'tree');
style('uploaderdash', 'app');
?>
<div id="react-app"></div>