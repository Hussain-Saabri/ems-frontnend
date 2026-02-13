import React, { useState } from 'react';
import {
    Alert01Icon,
    Cancel01Icon,
    Delete02Icon,
    Archive01Icon
} from 'hugeicons-react';
import { Button } from '@/components/ui/button';

export default function DeleteConfirmationDialog({
    isOpen,
    onClose,
    onConfirm,
    employeeName,
    isSubmitting
}) {
    const [deleteType, setDeleteType] = useState('soft'); // 'soft' or 'hard'

    // Reset delete type to 'soft' whenever the dialog opens
    React.useEffect(() => {
        if (isOpen) {
            setDeleteType('soft');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-gray-50">
                    <h2 className="text-xl font-bold text-gray-900">Delete Employee</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
                    >
                        <Cancel01Icon className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 text-center space-y-6">
                    <div className="flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center">
                            <Alert01Icon className="h-8 w-8 text-rose-600" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-gray-600">
                            Are you sure you want to delete <span className="font-bold text-gray-900">{employeeName}</span>?
                        </p>
                        <p className="text-sm text-gray-400">
                            Choose the type of deletion you want to perform.
                        </p>
                    </div>

                    {/* Deletion Type Selector */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <button
                            onClick={() => setDeleteType('soft')}
                            className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${deleteType === 'soft'
                                ? 'border-blue-600 bg-blue-50/50'
                                : 'border-gray-100 bg-white hover:border-gray-200'
                                }`}
                        >
                            <Archive01Icon className={`h-6 w-6 ${deleteType === 'soft' ? 'text-blue-600' : 'text-gray-400'}`} />
                            <div className="text-left">
                                <p className={`text-sm font-bold ${deleteType === 'soft' ? 'text-blue-900' : 'text-gray-900'}`}>Soft Delete</p>
                                <p className="text-[10px] text-gray-400 font-medium">Keep in database</p>
                            </div>
                        </button>

                        <button
                            onClick={() => setDeleteType('hard')}
                            className={`flex flex-col items-center gap-3 p-4 rounded-2xl border-2 transition-all ${deleteType === 'hard'
                                ? 'border-rose-600 bg-rose-50/50'
                                : 'border-gray-100 bg-white hover:border-gray-200'
                                }`}
                        >
                            <Delete02Icon className={`h-6 w-6 ${deleteType === 'hard' ? 'text-rose-600' : 'text-gray-400'}`} />
                            <div className="text-left">
                                <p className={`text-sm font-bold ${deleteType === 'hard' ? 'text-rose-900' : 'text-gray-900'}`}>Hard Delete</p>
                                <p className="text-[10px] text-gray-400 font-medium whitespace-nowrap">Remove permanently</p>
                            </div>
                        </button>
                    </div>

                    {deleteType === 'hard' && (
                        <p className="text-xs font-semibold text-rose-600 bg-rose-50 py-2 rounded-lg">
                            ⚠️ This action cannot be undone.
                        </p>
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="px-8 py-6 bg-gray-50/50 flex items-center justify-end gap-3">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="h-11 px-6 font-semibold text-gray-600 hover:bg-white"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant={deleteType === 'hard' ? 'destructive' : 'default'}
                        onClick={() => onConfirm(deleteType)}
                        className={`h-11 px-8 font-bold shadow-sm ${deleteType === 'soft' ? 'bg-blue-600 hover:bg-blue-700' : ''
                            }`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Deleting...
                            </span>
                        ) : (
                            deleteType === 'soft' ? 'Archive Employee' : 'Permanently Delete'
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
