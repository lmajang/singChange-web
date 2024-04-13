      // 获取列表元素
      var list = document.querySelector('ul');
      // 为每个列表项添加黑线以及 li-before（除了 system-model 和 local-history）
      list.querySelectorAll('li').forEach(function(li) {
          var li_before = document.createElement('div');
          li_before.className = 'li-before';
          li.appendChild(li_before);
          var line = document.createElement('div');
          line.className = 'bottom-line';
          li.appendChild(line);
      });

      var tl = gsap.timeline();

      // 添加点击事件监听器（除了 system-model 和 local-history）
      document.getElementById('modleANDhistory').addEventListener('click', function(event) {
          // 检查点击的是不是列表项
          if (event.target.nodeName === 'LI' && !event.target.classList.contains('system-model') && !event
              .target.classList.contains('local-history')) {
              // 检查之前的动画是否还在进行中，如果是，则取消之前的动画
              if (tl.isActive()) {
                  tl.kill(); // 取消之前的动画
              }
              tl = gsap.timeline();
              // 重置所有列表项前的对勾透明度为0
              gsap.set('.li-before', {
                  opacity: 0
              });
              // 找到点击的列表项前的对勾元素，并设置透明度为1
              var checkmark = event.target.querySelector('.li-before');
              tl.to(checkmark, {
                  opacity: 1
              });
          }
      });