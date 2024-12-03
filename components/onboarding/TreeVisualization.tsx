'use client';

import { motion, HTMLMotionProps } from 'framer-motion';

interface TreeNode {
  id: string;
  label: string;
  selected: boolean;
  children?: TreeNode[];
}

interface TreeVisualizationProps {
  data: TreeNode;
  onNodeClick: (id: string) => void;
}

export function TreeVisualization({ data, onNodeClick }: TreeVisualizationProps) {
  const renderNode = (node: TreeNode, level: number = 0) => {
    return (
      <motion.div
        {...({
          key: node.id,
          className: `relative ${level > 0 ? 'ml-8 mt-4' : ''}`,
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: level * 0.2 },
        } as HTMLMotionProps<'div'>)}
      >
        <button
          onClick={() => onNodeClick(node.id)}
          aria-pressed={node.selected}
          role="treeitem"
          aria-expanded={Boolean(node.children)}
          className={`
            px-4 py-2 rounded-lg transition-all duration-300
            ${node.selected 
              ? 'bg-[#8c52ff] text-white shadow-lg scale-105' 
              : 'bg-white border hover:border-[#8c52ff] hover:shadow'
            }
          `}
        >
          {node.label}
        </button>
        
        {node.children && (
          <div 
            className="mt-4 space-y-4"
            role="group"
            aria-label={`${node.label} children`}
          >
            {node.children.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="p-4" role="tree">
      {renderNode(data)}
    </div>
  );
} 