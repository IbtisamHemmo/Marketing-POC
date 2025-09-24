import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import  schemaTypes  from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Landing Page POC',
  
  projectId: 'pqgampq3',
  dataset: 'production',
  
  plugins: [
    structureTool(),
    visionTool()
  ],
  
  schema: {
    types: schemaTypes,
  },
})