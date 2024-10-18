import React from 'react';
import Tree from 'react-d3-tree';
import { CreditCard, DollarSign, Banknote, Lock, Smartphone, Gift, HelpCircle, User, Repeat } from 'lucide-react';

const bankingFeatures = [
  {"id":1,"feature":"Credit Card Application","feature_order":"31-1"},
  {"id":2,"feature":"Credit Card Limit Application","feature_order":"31-1-2"},
  {"id":3,"feature":"Credit Card Purchase","feature_order":"31-1-2-3"},
  {"id":4,"feature":"Credit Card Dept Payment","feature_order":"31-1-2-3-4"},
  {"id":5,"feature":"Credit Card Deactivation","feature_order":"31-1-2-5,31-1-2-3-4-5"},
  {"id":6,"feature":"Credit Card PIN Creation","feature_order":"31-1-2-6"},
  {"id":7,"feature":"Anonymous Debit Card Addition","feature_order":"8"},
  {"id":8,"feature":"Personalized Debit Card Application","feature_order":"31-8"},
  {"id":9,"feature":"Personalized Debit Card Received","feature_order":"31-8-9"},
  {"id":10,"feature":"Virtual Card Generation","feature_order":"10"},
  {"id":11,"feature":"Debit Card Purchase","feature_order":"7,8-9,10-11"},
  {"id":12,"feature":"ATM Deposit","feature_order":"12"},
  {"id":13,"feature":"ATM Withdrawal","feature_order":"12,14,16,17,19-13"},
  {"id":14,"feature":"QR Code Deposit","feature_order":"14"},
  {"id":15,"feature":"QR Code Withdrawal","feature_order":"12,14,16,17,19-15"},
  {"id":16,"feature":"Deposit from Own Account","feature_order":"16"},
  {"id":17,"feature":"Incoming Wire Transfer","feature_order":"17"},
  {"id":18,"feature":"Outgoing Wire Transfer","feature_order":"12,14,16,17,19-18"},
  {"id":19,"feature":"Incoming EFT Transfer","feature_order":"19"},
  {"id":20,"feature":"Outgoing EFT Transfer","feature_order":"12,14,16,17,19-20"},
  {"id":21,"feature":"Sending Money to Mobile Phone","feature_order":"12,14,16,17,19-21"},
  {"id":22,"feature":"Installment Loan Application","feature_order":"31-22"},
  {"id":23,"feature":"Installment Loan Limit Application","feature_order":"31-22-23"},
  {"id":24,"feature":"Purchasing with Installment Loan","feature_order":"31-22-23-24"},
  {"id":25,"feature":"Installment Loan Payment","feature_order":"31-22-23-24-25"},
  {"id":26,"feature":"Credit Application for BNPL","feature_order":"31-26"},
  {"id":27,"feature":"Credit Limit Application for BNPL","feature_order":"31-26-27"},
  {"id":28,"feature":"Purchasing with BNPL","feature_order":"31-26-27-28"},
  {"id":29,"feature":"BNPL Payment","feature_order":"31-26-27-28-29"},
  {"id":30,"feature":"Login","feature_order":null},
  {"id":31,"feature":"Upgrade Account","feature_order":"31"},
  {"id":32,"feature":"Pay with Hadi QR Code","feature_order":"12,14,16,17,19-32"},
  {"id":33,"feature":"Closing Hadi Account","feature_order":"33"},
  {"id":34,"feature":"Hadi Gold Membership","feature_order":"34"},
  {"id":35,"feature":"Hadi Gold Membership Cancellation","feature_order":"34-35"},
  {"id":36,"feature":"Hadi Gold A101 Loyalty","feature_order":"34-32-36"},
  {"id":37,"feature":"Hadi Gold EVE Loyalty","feature_order":"34-32-37"},
  {"id":38,"feature":"Hadi Gold English Home Loyalty","feature_order":"34-32-38"},
  {"id":39,"feature":"Create Hadi Together Group","feature_order":"39"},
  {"id":40,"feature":"Join Hadi Together Group","feature_order":"40"},
  {"id":41,"feature":"Hadi Together Loyalty","feature_order":"39,40-41"},
  {"id":42,"feature":"Pay with Hadi A101 QR Code","feature_order":"12,14,16,17,19-42"},
  {"id":43,"feature":"Invoice Payment","feature_order":"12,14,16,17,19-43"},
  {"id":44,"feature":"Scheduled Invoice Payment","feature_order":"12,14,16,17,19-44"},
  {"id":45,"feature":"Open Time Deposit Account","feature_order":"31-45"},
  {"id":46,"feature":"Open Demand Deposit Account","feature_order":"31-46"},
  {"id":47,"feature":"Close Time Deposit Account","feature_order":"31-45-47"},
  {"id":48,"feature":"Close Demand Deposit Account","feature_order":"31-46-48"},
  {"id":49,"feature":"Open USD Account","feature_order":"31-49"},
  {"id":50,"feature":"Open EURO Account","feature_order":"31-50"},
  {"id":51,"feature":"Open Gold Account","feature_order":"31-51"},
  {"id":52,"feature":"Close USD Account","feature_order":"31-49-52"},
  {"id":53,"feature":"Close EURO Account","feature_order":"31-50-53"},
  {"id":54,"feature":"Close Gold Account","feature_order":"31-51-54"},
  {"id":55,"feature":"Buy USD","feature_order":"31-49-55"},
  {"id":56,"feature":"Buy EURO","feature_order":"31-50-56"},
  {"id":57,"feature":"Buy Gold","feature_order":"31-51-57"},
  {"id":58,"feature":"Sell USD","feature_order":"31-49-58"},
  {"id":59,"feature":"Sell EURO","feature_order":"31-50-59"},
  {"id":60,"feature":"Sell Gold","feature_order":"31-51-60"},
];

const buildTree = (features) => {
  const idMap = new Map(features.map(f => [f.id.toString(), { ...f, children: [] }]));
  const root = { name: "Banking App", children: [] };

  features.forEach(feature => {
    const node = idMap.get(feature.id.toString());
    if (feature.feature_order) {
      const parentIds = feature.feature_order.split(',')[0].split('-');
      const parentId = parentIds[parentIds.length - 2];
      if (parentId) {
        const parent = idMap.get(parentId);
        if (parent) {
          parent.children.push(node);
        } else {
          root.children.push(node);
        }
      } else {
        root.children.push(node);
      }
    } else {
      root.children.push(node);
    }
  });

  return root;
};

const treeData = buildTree(bankingFeatures);

const renderForeignObjectNode = ({
  nodeDatum,
  foreignObjectProps
}) => (
  <foreignObject {...foreignObjectProps}>
    <div className="flex flex-col items-center text-sm p-2 rounded-lg bg-white shadow-md border-2 border-purple-200">
      {getIcon(nodeDatum.id)}
      <h3 className="text-purple-800 font-semibold text-center mt-1">{nodeDatum.name || nodeDatum.feature}</h3>
      <p className="text-purple-600 text-xs text-center mt-1">ID: {nodeDatum.id}</p>
    </div>
  </foreignObject>
);

const getIcon = (id) => {
  const icons = {
    1: <CreditCard className="text-purple-800" size={24} />,
    7: <CreditCard className="text-purple-800" size={24} />,
    12: <DollarSign className="text-purple-800" size={24} />,
    22: <Banknote className="text-purple-800" size={24} />,
    30: <Lock className="text-purple-800" size={24} />,
    31: <User className="text-purple-800" size={24} />,
    34: <Gift className="text-purple-800" size={24} />,
    39: <User className="text-purple-800" size={24} />,
    45: <DollarSign className="text-purple-800" size={24} />,
    61: <Repeat className="text-purple-800" size={24} />,
    66: <Gift className="text-purple-800" size={24} />,
    67: <HelpCircle className="text-purple-800" size={24} />,
  };
  return icons[id] || <Smartphone className="text-purple-800" size={24} />;
};

const BankingTreeDiagram: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Tree
        data={treeData}
        orientation="horizontal"
        pathFunc="step"
        translate={{ x: 500, y: 50 }}
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps: { width: 180, height: 120, x: -90, y: -40 } })
        }
        separation={{ siblings: 1.5, nonSiblings: 2 }}
        zoomable={true}
        collapsible={false}
        nodeSize={{ x: 300, y: 200 }}
        rootNodeClassName="root-node"
        branchNodeClassName="branch-node"
        leafNodeClassName="leaf-node"
      />
    </div>
  );
};

export default BankingTreeDiagram;