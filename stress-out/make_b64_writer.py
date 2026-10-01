import os, base64

with open('stress-out/src/pages/EmployeesPage.tsx', 'rb') as f:
    emp_b64 = base64.b64encode(f.read()).decode('ascii')

with open('stress-out/src/pages/EmployeeDetailPage.tsx', 'rb') as f:
    detail_b64 = base64.b64encode(f.read()).decode('ascii')

writer_js = """import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function writeB64(relativePath, b64) {
  const fullPath = path.resolve(__dirname, relativePath)
  const dir = path.dirname(fullPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  const content = Buffer.from(b64, 'base64').toString('utf8')
  fs.writeFileSync(fullPath, content, 'utf8')
  console.log('Wrote:', relativePath)
}

const empB64 = "%s"
const detailB64 = "%s"

writeB64('src/pages/EmployeesPage.tsx', empB64)
writeB64('src/pages/EmployeeDetailPage.tsx', detailB64)
console.log('Successfully wrote EmployeesPage.tsx and EmployeeDetailPage.tsx')
""" % (emp_b64, detail_b64)

with open('stress-out/_write_employees_and_detail.js', 'w', encoding='utf-8') as f:
    f.write(writer_js)

print("Created base64-based _write_employees_and_detail.js successfully.")
