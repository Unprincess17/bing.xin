const fs = require('fs');
const path = require('path');

// 配置
const CONFIG = {
  targetDir: path.join(__dirname, '../docs'),     // 生成到 doc 目录
  exclude: ['index.html'],                   // 排除文件
  template: {
    header: `<!DOCTYPE html>
<html>
<head>
  <link rel="icon" href="https://raw.githubusercontent.com/Unprincess17/bing.xin/refs/heads/main/res/favicon/favicon.ico" type="image/x-icon">
  <title>Bing.xin's tools</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 2rem auto; }
    .tool-list { list-style: none; padding: 0; }
    .tool-item { margin: 1rem 0; }
    .tool-link { 
      display: block; 
      padding: 1rem; 
      border: 1px solid #e1e4e8;
      border-radius: 6px;
      text-decoration: none;
      color: #0366d6;
      transition: background 0.2s;
    }
    .tool-link:hover { background: #f6f8fa; }
  </style>
</head>
<body>
  <h1>Bing.xin's tools</h1>
  <ul class="tool-list">`,
    footer: `  </ul>
</body>
</html>`
  }
};

// 生成索引页
function generateIndex() {
  const files = fs.readdirSync(CONFIG.targetDir)
    .filter(file => 
      file.endsWith('.html') && 
      !CONFIG.exclude.includes(file)
    )
    .sort();

  const listItems = files.map(file => {
    const name = path.basename(file, '.html');
    return `
    <li class="tool-item">
      <a href="${file}" class="tool-link">
        ${name.replace(/-/g, ' ')}
      </a>
    </li>`;
  }).join('\n');

  const fullHTML = `${CONFIG.template.header}
${listItems}
${CONFIG.template.footer}`;

  fs.writeFileSync(path.join(CONFIG.targetDir, 'index.html'), fullHTML);
  console.log(`✅ 生成成功，共 ${files.length} 个工具`);
}

// 执行生成
generateIndex();
